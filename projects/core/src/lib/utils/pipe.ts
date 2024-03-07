import type {MaskitoPostprocessor, MaskitoPreprocessor} from '../types';

/**
 * @internal
 */
export function maskitoPipe(
    processors?: readonly MaskitoPreprocessor[],
): MaskitoPreprocessor;

/**
 * @internal
 */
export function maskitoPipe(
    processors?: readonly MaskitoPostprocessor[],
): MaskitoPostprocessor;

/* eslint-disable @typescript-eslint/ban-types */
/**
 * @internal
 */
export function maskitoPipe(processors: readonly Function[] = []): Function {
    return (initialData: object, ...readonlyArgs: unknown[]) =>
        processors.reduce(
            (data, fn) => ({...data, ...fn(data, ...readonlyArgs)}),
            initialData,
        );
}
