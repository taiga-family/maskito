import {SelectionRange} from '../types';

export function extendToNotEmptyRange(
    [from, to]: SelectionRange,
    isForward: boolean,
): SelectionRange {
    if (from !== to) {
        return [from, to];
    }

    return isForward ? [from, to + 1] : [from - 1, to];
}
