import {type MaskitoPlugin, maskitoTransform, maskitoUpdateElement} from '@maskito/core';

import type {MaskitoDateSegments} from '../types';
import {
    clamp,
    getDateSegmentsOrder,
    mod,
    noop,
    parseDateString,
    toDateString,
} from '../utils';
import {maskitoEventHandler} from './event-handler';

export function createDateSegmentsSteppingPlugin({
    step,
    dateModeTemplate,
}: {
    step: number;
    dateModeTemplate: string;
}): MaskitoPlugin {
    if (!Number.isSafeInteger(step) || step <= 0) {
        return noop;
    }

    const yearLength = dateModeTemplate.match(/y/g)?.length ?? 0;
    const segments = getDateSegmentsOrder(dateModeTemplate)
        .filter((name) => dateModeTemplate.includes(name[0]!))
        .map((name) => ({
            name,
            from: dateModeTemplate.indexOf(name[0]!),
            to: dateModeTemplate.lastIndexOf(name[0]!) + 1,
        }));

    return maskitoEventHandler('keydown', (element, options, event) => {
        if (
            (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') ||
            event.defaultPrevented ||
            event.isComposing ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            element.matches('[readonly]')
        ) {
            return;
        }

        const {value, selectionStart} = element;
        const from = selectionStart ?? 0;
        const activeSegment = segments.find(
            (segment) => segment.from <= from && from <= segment.to,
        );

        if (!activeSegment) {
            return;
        }

        event.preventDefault();

        const values = parseDateString(value, dateModeTemplate);
        const {name, from: start, to: end} = activeSegment;
        const length = end - start;
        const current = Number((values[name] ?? '').padEnd(length, '0'));
        const delta = event.key === 'ArrowUp' ? step : -step;
        const min = 1;
        const max = {
            day: getDaysInMonth(values, yearLength),
            month: 12,
            year: 10 ** length - 1,
        }[name];

        const initial = !values[name] && delta < 0 ? min : current;
        const next =
            name === 'year'
                ? clamp(initial + delta, min, max)
                : mod(initial + delta, min, max + 1);

        values[name] = String(next).padStart(length, '0');

        const maxDay = getDaysInMonth(values, yearLength);

        if (values.day && Number(values.day) > maxDay) {
            values.day = String(maxDay);
        }

        const updatedValue = toDateString(values, {dateMode: dateModeTemplate});
        const trailingSeparator = /\D+$/.exec(value)?.[0] ?? '';
        const preserveSeparator = end <= value.length - trailingSeparator.length;

        const nextValue = preserveSeparator
            ? `${updatedValue}${trailingSeparator}`
            : updatedValue;

        maskitoUpdateElement(
            element,
            maskitoTransform({value: nextValue, selection: [from, from]}, options),
        );
    });
}

function getDaysInMonth(
    {month, year}: Partial<MaskitoDateSegments>,
    yearLength: number,
): number {
    const date = new Date(0);
    const fullYear =
        year?.length === yearLength ? Number(year) + (yearLength === 2 ? 2000 : 0) : 1972;

    date.setFullYear(fullYear, Number(month || 1), 0);

    return date.getDate();
}
