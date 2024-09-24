import type {ElementState, MaskitoOptions} from '../../../types';

export function applyOverwriteMode(
    {value, selection}: ElementState,
    newCharacters: string,
    mode: MaskitoOptions['overwriteMode'],
): ElementState {
    const [from, to] = selection;
    const computedMode = typeof mode === 'function' ? mode({value, selection}) : mode;

    return {
        value,
        selection:
            computedMode === 'replace'
                ? [from, Math.max(from + newCharacters.length, to)]
                : [from, to],
    };
}
