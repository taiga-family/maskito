import type {ElementState, SelectionRange} from '../types';

export function getNotEmptySelection(
    {value, selection}: ElementState,
    isForward: boolean,
): SelectionRange {
    const [from, to] = selection;

    if (from !== to) {
        return [from, to];
    }

    const notEmptySelection = isForward ? [from, to + 1] : [from - 1, to];

    return notEmptySelection.map((x) => Math.min(Math.max(x, 0), value.length)) as [
        number,
        number,
    ];
}
