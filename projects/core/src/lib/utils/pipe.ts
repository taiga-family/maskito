import {MaskPostprocessor, MaskPreprocessor} from '../types';

export function maskitoPipe(...processors: readonly MaskPreprocessor[]): MaskPreprocessor;

export function maskitoPipe(
    ...processors: readonly MaskPostprocessor[]
): MaskPostprocessor;

// eslint-disable-next-line @typescript-eslint/ban-types
export function maskitoPipe(...processors: readonly Function[]): Function {
    return (initialData: object, ...readonlyArgs: unknown[]) =>
        processors.reduce(
            (data, fn) => ({...data, ...fn(data, ...readonlyArgs)}),
            initialData,
        );
}
