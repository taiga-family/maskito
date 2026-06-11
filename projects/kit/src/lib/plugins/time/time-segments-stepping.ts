import {type MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import {CHAR_NO_BREAK_SPACE} from '../../constants';
import {type MaskitoTimeParams} from '../../masks/time';
import type {MaskitoTimeSegments} from '../../types';
import {noop} from '../../utils';
import {createDayPeriodMatchers, hasDayPeriod} from '../../utils/time';

type TimeSegment = keyof MaskitoTimeSegments<number>;

export function createTimeSegmentsSteppingPlugin({
    step,
    fullMode,
    timeSegmentMinValues,
    timeSegmentMaxValues,
    dayPeriod,
}: Pick<Required<MaskitoTimeParams>, 'dayPeriod' | 'step'> & {
    fullMode: string;
    timeSegmentMinValues: MaskitoTimeSegments<number>;
    timeSegmentMaxValues: MaskitoTimeSegments<number>;
}): MaskitoPlugin {
    const segmentsIndexes = createTimeSegmentsIndexes(fullMode);

    return step <= 0
        ? noop
        : (element) => {
              const listener = (event: KeyboardEvent): void => {
                  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
                      return;
                  }

                  event.preventDefault();

                  const selectionStart = element.selectionStart ?? 0;

                  const activeSegment = getActiveSegment({
                      segmentsIndexes,
                      selectionStart,
                  });

                  if (!activeSegment) {
                      return;
                  }

                  const toAdd = event.key === 'ArrowUp' ? step : -step;
                  const selection = segmentsIndexes.get(activeSegment)!;
                  const meridiem = hasDayPeriod(dayPeriod) ? dayPeriod : null;
                  const previousValue = element.value;

                  const updatedValue = updateSegmentValue({
                      selection,
                      value: previousValue,
                      toAdd,
                      min: timeSegmentMinValues[activeSegment],
                      max: timeSegmentMaxValues[activeSegment],
                  });

                  maskitoUpdateElement(element, {
                      value:
                          meridiem &&
                          shouldToggleMeridiem({
                              activeSegment,
                              previousValue,
                              selection,
                              toAdd,
                          })
                              ? toggleMeridiem(updatedValue, meridiem)
                              : updatedValue,
                      selection: [selectionStart, selectionStart],
                  });
              };

              element.addEventListener('keydown', listener);

              return () => element.removeEventListener('keydown', listener);
          };
}

function createTimeSegmentsIndexes(
    fullMode: string,
): Map<TimeSegment, readonly [number, number]> {
    return new Map([
        ['hours', getSegmentRange(fullMode, 'HH')],
        ['milliseconds', getSegmentRange(fullMode, 'MSS')],
        ['minutes', getSegmentRange(fullMode, 'MM')],
        ['seconds', getSegmentRange(fullMode, 'SS')],
    ]);
}

function getSegmentRange(mode: string, segment: string): [number, number] {
    const index = mode.indexOf(segment);

    return index === -1 ? [-1, -1] : [index, index + segment.length];
}

function getActiveSegment({
    segmentsIndexes,
    selectionStart,
}: {
    segmentsIndexes: Map<TimeSegment, readonly [number, number]>;
    selectionStart: number;
}): TimeSegment | null {
    for (const [segmentName, segmentRange] of segmentsIndexes.entries()) {
        const [from, to] = segmentRange;

        if (from <= selectionStart && selectionStart <= to) {
            return segmentName;
        }
    }

    return null;
}

function updateSegmentValue({
    selection,
    value,
    toAdd,
    min,
    max,
}: {
    selection: readonly [number, number];
    value: string;
    toAdd: number;
    min: number;
    max: number;
}): string {
    const [from, to] = selection;
    const segmentValue = Number(value.slice(from, to).padEnd(to - from, '0'));
    const newSegmentValue = mod(segmentValue + toAdd, min, max + 1);

    return `${value.slice(0, from)}${String(newSegmentValue).padStart(
        to - from,
        '0',
    )}${value.slice(to)}`;
}

function mod(value: number, min: number, max: number): number {
    const range = max - min;

    return ((((value - min) % range) + range) % range) + min;
}

function shouldToggleMeridiem({
    activeSegment,
    previousValue,
    selection,
    toAdd,
}: {
    activeSegment: TimeSegment;
    previousValue: string;
    selection: readonly [number, number];
    toAdd: number;
}): boolean {
    if (activeSegment !== 'hours') {
        return false;
    }

    const [segmentStart, segmentEnd] = selection;
    const segmentLength = segmentEnd - segmentStart;

    const previousHour = Number(
        previousValue.slice(segmentStart, segmentEnd).padEnd(segmentLength, '0'),
    );

    const dialIndex = previousHour % 12;
    const wraps = Math.floor((dialIndex + toAdd) / 12);

    return Math.abs(wraps) % 2 === 1;
}

function toggleMeridiem(
    value: string,
    dayPeriod: Required<MaskitoTimeParams>['dayPeriod'],
): string {
    const [am, pm] = dayPeriod;
    const lowerValue = value.toLowerCase();
    const containsAm = lowerValue.includes(am.toLowerCase());
    const containsPm = lowerValue.includes(pm.toLowerCase());

    if (!containsAm && !containsPm) {
        return value;
    }

    const nextMeridiem = containsAm ? pm : am;
    const {anyDayPeriodCharRE} = createDayPeriodMatchers(dayPeriod);

    return value.replace(anyDayPeriodCharRE, `${CHAR_NO_BREAK_SPACE}${nextMeridiem}`);
}
