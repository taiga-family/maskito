import {ElementState, SelectionRange} from '../types';

export function getNotEmptySelection(
    {value, selection}: ElementState,
    isForward: boolean,
): SelectionRange {
    const [from, to] = selection;

    if (from !== to) {
        return [from, to];
    }

    return isForward
        ? [from, Math.min(to + 1, value.length)]
        : [Math.max(from - 1, 0), to];
}
