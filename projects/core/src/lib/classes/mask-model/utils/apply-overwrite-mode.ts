import {ElementState, MaskitoOptions} from '../../../types';

export function applyOverwriteMode(
    {value, selection}: ElementState,
    newCharacters: string,
    mode: MaskitoOptions['overwriteMode'],
): ElementState {
    const [from, to] = selection;

    return {
        value,
        selection: mode === 'replace' ? [from, from + newCharacters.length] : [from, to],
    };
}
