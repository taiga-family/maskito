import {MaskPostprocessor, MaskPreprocessor} from '../types';

export function maskitoPipe(
    ...processors: ReadonlyArray<MaskPreprocessor | null | undefined>
): MaskPreprocessor;

export function maskitoPipe(
    ...processors: ReadonlyArray<MaskPostprocessor | null | undefined>
): MaskPostprocessor;

/* eslint-disable @typescript-eslint/ban-types */
export function maskitoPipe(
    ...processors: ReadonlyArray<Function | null | undefined>
): Function {
    return (initialData: object, ...readonlyArgs: unknown[]) =>
        processors
            .filter(<T>(x: T | null | undefined): x is T => Boolean(x))
            .reduce((data, fn) => ({...data, ...fn(data, ...readonlyArgs)}), initialData);
}
