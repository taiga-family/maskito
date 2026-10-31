import {type MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import type {MaskitoDateSegments} from '../types';
import {getDateSegmentsOrder, noop} from '../utils';

export function createDateSegmentsSteppingPlugin({
    step,
    dateModeTemplate,
}: {
    step: number;
    dateModeTemplate: string;
}): MaskitoPlugin {
    const yearLength = dateModeTemplate.match(/y/g)?.length ?? 0;
    const segments = getDateSegmentsOrder(dateModeTemplate)
        .filter((name) => dateModeTemplate.includes(name[0]!))
        .map((name) => ({
            name,
            from: dateModeTemplate.indexOf(name[0]!),
            to: dateModeTemplate.lastIndexOf(name[0]!) + 1,
        }));

    return !Number.isSafeInteger(step) || step <= 0
        ? noop
        : (element) => {
              const listener = (event: KeyboardEvent): void => {
                  if (
                      (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') ||
                      event.defaultPrevented ||
                      event.isComposing ||
                      event.altKey ||
                      event.ctrlKey ||
                      event.metaKey ||
                      event.shiftKey ||
                      element.matches('[readonly], :disabled')
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

                  const values: Partial<MaskitoDateSegments> = {};

                  for (const segment of segments) {
                      values[segment.name] = value.slice(segment.from, segment.to);
                  }

                  const {name, from: start, to: end} = activeSegment;
                  const length = end - start;
                  const current = Number((values[name] ?? '').padEnd(length, '0'));
                  const delta = event.key === 'ArrowUp' ? step : -step;
                  const min = name === 'year' && length === 2 ? 0 : 1;
                  const max = {
                      day: getDaysInMonth(values, yearLength),
                      month: 12,
                      year: 10 ** length - 1,
                  }[name];

                  const range = max - min + 1;
                  const initial = !values[name] && delta < 0 ? min : current;
                  const next =
                      name === 'year'
                          ? Math.min(max, Math.max(min, initial + delta))
                          : ((((initial + delta - min) % range) + range) % range) + min;

                  values[name] = String(next).padStart(length, '0');

                  if (values.day) {
                      values.day = String(
                          Math.min(
                              Number(values.day),
                              getDaysInMonth(values, yearLength),
                          ),
                      ).padStart(2, '0');
                  }

                  const updatedValue = [...segments]
                      .reverse()
                      .reduce(
                          (result, segment) =>
                              `${result.slice(0, segment.from)}${values[segment.name] ?? ''}${result.slice(segment.to)}`,
                          value,
                      );

                  maskitoUpdateElement(element, {
                      value: updatedValue,
                      selection: [from, from],
                  });
              };

              element.addEventListener('keydown', listener);

              return () => element.removeEventListener('keydown', listener);
          };
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
