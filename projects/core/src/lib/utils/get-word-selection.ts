import {ElementState, SelectionRange} from '../types';

const TRAILING_SPACES_REG = /\s+$/g;
const LEADING_SPACES_REG = /^\s+/g;
const SPACE_REG = /\s/;

export function getWordSelection(
    {value, selection}: ElementState,
    isForward: boolean,
): SelectionRange {
    const [from, to] = selection;

    if (from !== to) {
        return [from, to];
    }

    if (isForward) {
        const valueAfterSelectionStart = value.slice(from);
        const [leadingSpaces] = valueAfterSelectionStart.match(LEADING_SPACES_REG) || [
            '',
        ];
        const nearestWordEndIndex = valueAfterSelectionStart
            .replace(LEADING_SPACES_REG, '') // TODO replace with `String.trimStart` after bumping Firefox to 61+
            .search(SPACE_REG);

        return [
            from,
            nearestWordEndIndex !== -1
                ? from + leadingSpaces.length + nearestWordEndIndex
                : value.length,
        ];
    }

    const valueBeforeSelectionEnd = value.slice(0, to);
    const [trailingSpaces] = valueBeforeSelectionEnd.match(TRAILING_SPACES_REG) || [''];
    const selectedWordLength = valueBeforeSelectionEnd
        .replace(TRAILING_SPACES_REG, '') // TODO replace with `String.trimEnd` after bumping Firefox to 61+
        .split('')
        .reverse()
        .findIndex(char => char.match(SPACE_REG));

    return [
        selectedWordLength !== -1 ? to - trailingSpaces.length - selectedWordLength : 0,
        to,
    ];
}
