import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import type {MaskitoTimeSegments} from '../../types';

const noop = (): void => {};

export function createTimeSegmentsSteppingPlugin({
    step,
    fullMode,
    timeSegmentMaxValues,
}: {
    step: number;
    fullMode: string;
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

                  const updatedValue = updateSegmentValue({
                      selection: segmentsIndexes.get(activeSegment)!,
                      value: element.value,
                      toAdd: event.key === 'ArrowUp' ? step : -step,
                      max: timeSegmentMaxValues[activeSegment],
                  });

                  maskitoUpdateElement(element, {
                      value: updatedValue,
                      selection: [selectionStart, selectionStart],
                  });
              };

              element.addEventListener('keydown', listener);

              return () => element.removeEventListener('keydown', listener);
          };
}

function createTimeSegmentsIndexes(
    fullMode: string,
): Map<keyof MaskitoTimeSegments, readonly [number, number]> {
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
    segmentsIndexes: Map<keyof MaskitoTimeSegments, readonly [number, number]>;
    selectionStart: number;
}): keyof MaskitoTimeSegments | null {
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
    max,
}: {
    selection: readonly [number, number];
    value: string;
    toAdd: number;
    max: number;
}): string {
    const [from, to] = selection;
    const segmentValue = Number(value.slice(from, to).padEnd(to - from, '0'));
    const newSegmentValue = mod(segmentValue + toAdd, max + 1);

    return (
        value.slice(0, from) +
        String(newSegmentValue).padStart(to - from, '0') +
        value.slice(to, value.length)
    );
}

function mod(value: number, max: number): number {
    if (value < 0) {
        value += Math.floor(Math.abs(value) / max + 1) * max;
    }

    return value % max;
}
