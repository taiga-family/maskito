import type {MaskitoPlugin} from '@maskito/core';

import type {MaskitoDateParams} from '../masks/date/date-params';
import {maskitoWithDateDefaults} from '../masks/date/utils/with-date-defaults';

type DateSegmentName = 'day' | 'month' | 'year';

interface DateSegment {
    name: DateSegmentName;
    from: number;
    to: number;
}

export type MaskitoDateSegmentNavigationParams = MaskitoDateParams & {
    /** Localized names for screen reader announcements. */
    ariaLabels?: Partial<Record<DateSegmentName, string>>;
    /** Localized description of an unfilled segment. */
    emptyLabel?: string;
};

/**
 * Enables keyboard navigation and stepping within date segments.
 *
 * Combine with maskitoWithPlaceholder for empty segments, but omit its first
 * plugin (maskitoCaretGuard), which prevents selecting placeholder characters.
 */
export function maskitoDateSegmentNavigation(
    params: MaskitoDateSegmentNavigationParams,
): MaskitoPlugin {
    const {mode, separator} = maskitoWithDateDefaults(params);
    const template = mode.split('/').join(separator);
    const segments: DateSegment[] = [];

    for (const match of template.matchAll(/d+|m+|y+/g)) {
        const token = match[0];
        const from = match.index;

        segments.push({
            name: getDateSegmentName(token),
            from,
            to: from + token.length,
        });
    }

    const labels = {day: 'Day', month: 'Month', year: 'Year', ...params.ariaLabels};
    const emptyLabel = params.emptyLabel ?? 'empty';

    return (element) => {
        const announcer = element.ownerDocument.createElement('span');

        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText =
            'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap';
        element.parentNode?.appendChild(announcer);

        const select = (index: number): void => {
            const segment = segments[index];

            if (!segment) {
                return;
            }

            element.setSelectionRange(segment.from, segment.to);

            const value = element.value.slice(segment.from, segment.to);

            announcer.textContent = `${labels[segment.name]}, ${/^\d+$/.test(value) ? value : emptyLabel}`;
        };

        const activeIndex = (): number => {
            const from = element.selectionStart ?? 0;
            const to = element.selectionEnd ?? from;
            const selected = segments.findIndex(
                (segment) => segment.from === from && segment.to === to,
            );

            if (selected !== -1) {
                return selected;
            }

            const containing = segments.findIndex(
                (segment) => segment.from <= from && from < segment.to,
            );

            if (containing !== -1) {
                return containing;
            }

            const next = segments.findIndex((segment) => segment.from >= from);

            return next === -1 ? segments.length - 1 : next;
        };

        const insert = (from: number, to: number, digits: string): boolean => {
            element.setSelectionRange(from, to);

            const beforeInput = new InputEvent('beforeinput', {
                bubbles: true,
                cancelable: true,
                inputType: 'insertText',
                data: digits,
            });

            if (!element.dispatchEvent(beforeInput)) {
                return false;
            }

            // Use Maskito's insert pipeline, including its processors, rather
            // than execCommand or a direct value write followed by validation.
            element.dispatchEvent(
                new InputEvent('input', {
                    bubbles: true,
                    inputType: 'insertText',
                    data: digits,
                }),
            );

            return true;
        };

        const step = (index: number, amount: number): void => {
            const segment = segments[index];

            if (!segment) {
                return;
            }

            const current = Object.fromEntries(
                segments.map(({name, from, to}) => [name, element.value.slice(from, to)]),
            ) as Partial<Record<DateSegmentName, string>>;

            const month = Number(current.month);
            const year = Number(current.year) + (current.year?.length === 2 ? 2000 : 0);
            let max = 31;

            if (segment.name === 'month') {
                max = 12;
            } else if (segment.name === 'year') {
                max = Number('9'.repeat(segment.to - segment.from));
            } else if (month >= 1 && month <= 12) {
                max = daysInMonth(
                    month,
                    Number.isInteger(year) && year > 0 ? year : 2000,
                );
            }

            const min =
                segment.name === 'year' && segment.to - segment.from === 2 ? 0 : 1;

            const previous = Number(current[segment.name]);
            const valid =
                /^\d+$/.test(current[segment.name] ?? '') &&
                previous >= min &&
                previous <= max;

            const range = max - min + 1;
            let next = amount > 0 ? min : max;

            if (valid) {
                next = ((previous - min + amount + range) % range) + min;
            }

            const updated: Partial<Record<DateSegmentName, string>> = {
                ...current,
                [segment.name]: String(next).padStart(segment.to - segment.from, '0'),
            };

            if (
                segment.name !== 'day' &&
                /^\d+$/.test(current.day ?? '') &&
                /^\d+$/.test(updated.month ?? '')
            ) {
                const nextYear =
                    Number(updated.year) + (updated.year?.length === 2 ? 2000 : 0);

                const limit = daysInMonth(
                    Number(updated.month),
                    Number.isInteger(nextYear) && nextYear > 0 ? nextYear : 2000,
                );

                if (Number(updated.day) > limit) {
                    updated.day = String(limit).padStart(2, '0');
                }
            }

            const complete = segments.every(
                ({name, from, to}) =>
                    /^\d+$/.test(current[name] ?? '') &&
                    current[name]?.length === to - from,
            );

            if (complete) {
                // Replace the entire date atomically to avoid invalid interim dates.
                const digits = segments.map(({name}) => updated[name]).join('');

                insert(0, element.value.length, digits);
            } else {
                const day = segments.find(({name}) => name === 'day');

                if (
                    day &&
                    updated.day !== current.day &&
                    !insert(day.from, day.to, updated.day!)
                ) {
                    select(index);

                    return;
                }

                insert(segment.from, segment.to, updated[segment.name]!);
            }

            select(index);
        };

        const onFocus = (): void => select(0);
        const onPointerUp = (): void => select(activeIndex());
        const onKeyDown = (event: KeyboardEvent): void => {
            if (
                element.hasAttribute('readonly') ||
                element.hasAttribute('disabled') ||
                event.ctrlKey ||
                event.altKey ||
                event.metaKey
            ) {
                return;
            }

            const index = activeIndex();

            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                step(index, event.key === 'ArrowUp' ? 1 : -1);
            } else if (
                event.key === 'Tab' ||
                event.key === 'ArrowLeft' ||
                event.key === 'ArrowRight'
            ) {
                const backwards =
                    event.key === 'ArrowLeft' || (event.key === 'Tab' && event.shiftKey);

                const next = index + (backwards ? -1 : 1);

                if (next >= 0 && next < segments.length) {
                    event.preventDefault();
                    select(next);
                } else if (event.key !== 'Tab') {
                    event.preventDefault();
                }
            }
        };

        element.addEventListener('focus', onFocus);
        element.addEventListener('pointerup', onPointerUp);
        element.addEventListener('keydown', onKeyDown);

        return () => {
            element.removeEventListener('focus', onFocus);
            element.removeEventListener('pointerup', onPointerUp);
            element.removeEventListener('keydown', onKeyDown);
            announcer.remove();
        };
    };
}

function daysInMonth(month: number, year: number): number {
    if (month === 2) {
        const isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

        return isLeapYear ? 29 : 28;
    }

    return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
}

function getDateSegmentName(token: string): DateSegmentName {
    switch (token[0]) {
        case 'd':
            return 'day';
        case 'm':
            return 'month';
        default:
            return 'year';
    }
}
