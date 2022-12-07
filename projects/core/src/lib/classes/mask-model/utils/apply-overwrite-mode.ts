import {ElementState, MaskitoOptions} from '../../../types';

export function applyOverwriteMode(
    {value, selection}: ElementState,
    mode: MaskitoOptions['overwriteMode'],
): ElementState {
    const [from, to] = selection;

    if (from !== to || to >= value.length) {
        return {value, selection};
    }

    return {value, selection: mode === 'replace' ? [from, to + 1] : [from, to]};
}
