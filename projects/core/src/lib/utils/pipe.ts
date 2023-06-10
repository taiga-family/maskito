import {MaskitoPostprocessor, MaskitoPreprocessor} from '../types';

/**
 * @deprecated Use property `preprocessors` from `MaskitoOptions`
 * @internal
 */
export function maskitoPipe(
    ...processors: ReadonlyArray<MaskitoPreprocessor | null | undefined>
): MaskitoPreprocessor;

/**
 * @deprecated Use property `postprocessors` from `MaskitoOptions`
 * @internal
 */
export function maskitoPipe(
    ...processors: ReadonlyArray<MaskitoPostprocessor | null | undefined>
): MaskitoPostprocessor;

/* eslint-disable @typescript-eslint/ban-types */
/**
 * @deprecated Use property `preprocessors` / `postprocessors` from `MaskitoOptions`
 * @internal
 */
export function maskitoPipe(
    ...processors: ReadonlyArray<Function | null | undefined>
): Function {
    return (initialData: object, ...readonlyArgs: unknown[]) =>
        processors
            .filter((x: Function | null | undefined): x is Function => !!x)
            .reduce((data, fn) => ({...data, ...fn(data, ...readonlyArgs)}), initialData);
}
