import type {MaskitoOptions} from '@maskito/core';

const LRM = '\u200E';
const LRI = '\u2066';
const PDI = '\u2069';
const START_MARK = LRM;
const END_MARK = LRM;
const BIDI_MARKS_REGEXP = /[\u200E\u2066\u2069]/g;

interface Options {
    shouldIsolate: (cleanValue: string) => boolean;
}

export function maskitoWithBidiIsolation(
    options: MaskitoOptions,
    {shouldIsolate}: Options,
): MaskitoOptions {
    return {
        ...options,
        preprocessors: [
            ({elementState, data}) => {
                const {value, selection} = elementState;

                return {
                    elementState: {
                        value: removeBidiIsolation(value),
                        selection: [
                            toCleanSelectionIndex(value, selection[0]),
                            toCleanSelectionIndex(value, selection[1]),
                        ],
                    },
                    data: removeBidiIsolation(data),
                };
            },
            ...(options.preprocessors ?? []),
        ],
        postprocessors: [
            ...(options.postprocessors ?? []),
            ({value, selection}) => {
                const cleanValue = removeBidiIsolation(value);

                const cleanSelection = [
                    toCleanSelectionIndex(value, selection[0]),
                    toCleanSelectionIndex(value, selection[1]),
                ] satisfies [number, number];

                return !cleanValue || !shouldIsolate(cleanValue)
                    ? {
                          value: cleanValue,
                          selection: cleanSelection,
                      }
                    : {
                          value: addBidiIsolation(cleanValue),
                          selection: [
                              toIsolatedSelectionIndex(cleanSelection[0]),
                              toIsolatedSelectionIndex(cleanSelection[1]),
                          ],
                      };
            },
        ],
    };
}

function removeBidiIsolation(value: string): string {
    return value.replaceAll(BIDI_MARKS_REGEXP, '');
}

function isBidiMark(char: string): boolean {
    return char === LRM || char === LRI || char === PDI;
}

function addBidiIsolation(value: string): string {
    return value ? `${START_MARK}${value}${END_MARK}` : '';
}

function toCleanSelectionIndex(value: string, index: number): number {
    const limit = Math.min(index, value.length);
    let marksBeforeIndex = 0;

    for (let i = 0; i < limit; i++) {
        if (isBidiMark(value[i] ?? '')) {
            marksBeforeIndex++;
        }
    }

    return Math.max(limit - marksBeforeIndex, 0);
}

function toIsolatedSelectionIndex(index: number): number {
    return index + START_MARK.length;
}
