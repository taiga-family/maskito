import {SelectionRange} from '../../types';

export function setContentEditableSelection(
    element: HTMLElement,
    [from, to]: SelectionRange,
): void {
    const document = element.ownerDocument;
    const range = document.createRange();

    range.setStart(element.firstChild || element, from);
    range.setEnd(element.lastChild || element, to);
    const selection = document.getSelection();

    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
