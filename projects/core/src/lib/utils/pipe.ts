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

/**
 * @internal
 */
export function maskitoPipe<State extends object, Args extends unknown[]>(
    processors: ReadonlyArray<(state: State, ...args: Args) => Partial<State>> = [],
): (state: State, ...args: Args) => State {
    return (initialData: State, ...args: Args) =>
        processors.reduce((data, fn) => ({...data, ...fn(data, ...args)}), initialData);
}
