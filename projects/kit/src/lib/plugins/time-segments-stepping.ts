import type {MaskitoPlugin} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import type {MaskitoTimeSegments} from '../types';

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
        : element => {
              const listener = (event: KeyboardEvent): void => {
                  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
                      return;
                  }

                  event.preventDefault();
                  const selectionStart = element.selectionStart || 0;
                  const selectedSegment = getSelectedSegment({
                      segmentsIndexes,
                      selectionStart,
                  });

                  if (!selectedSegment) {
                      return;
                  }

                  const segmentSelection = segmentsIndexes.get(
                      selectedSegment,
                  ) as number[];

                  const updatedValue = updateSegmentValue({
                      selection: [
                          segmentSelection[0],
                          segmentSelection[segmentSelection.length - 1],
                      ],
                      value: element.value,
                      toAdd: event.key === 'ArrowUp' ? step : -step,
                      max: timeSegmentMaxValues[selectedSegment],
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
): Map<keyof MaskitoTimeSegments, number[]> {
    return new Map([
        ['hours', createIndexes(fullMode.indexOf('HH'), 'HH'.length)],
        ['minutes', createIndexes(fullMode.indexOf('MM'), 'MM'.length)],
        ['seconds', createIndexes(fullMode.indexOf('SS'), 'SS'.length)],
        ['milliseconds', createIndexes(fullMode.indexOf('MSS'), 'MSS'.length)],
    ]);
}

function createIndexes(index: number, count: number): number[] {
    return index === -1 ? [] : new Array(count + 1).fill(index).map((val, i) => val + i);
}

function getSelectedSegment({
    segmentsIndexes,
    selectionStart,
}: {
    segmentsIndexes: Map<keyof MaskitoTimeSegments, number[]>;
    selectionStart: number;
}): keyof MaskitoTimeSegments | null {
    for (const key of segmentsIndexes.keys()) {
        if (segmentsIndexes.get(key)?.includes(selectionStart)) {
            return key;
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
    const [start, end] = selection;
    const segmentValue = Number(value.slice(start, end).padEnd(end - start, '0'));
    const newSegmentValue = mod(segmentValue + toAdd, max + 1);

    return (
        value.slice(0, start) +
        String(newSegmentValue).padStart(end - start, '0') +
        value.slice(end, value.length)
    );
}

function mod(value: number, max: number): number {
    if (value < 0) {
        value += Math.floor(Math.abs(value) / max + 1) * max;
    }

    return value % max;
}
