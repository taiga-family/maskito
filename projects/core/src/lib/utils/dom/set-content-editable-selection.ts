import type {SelectionRange} from '../../types';

export function setContentEditableSelection(
    element: HTMLElement,
    [from, to]: SelectionRange,
): void {
    const document = element.ownerDocument;
    const range = document.createRange();

    range.setStart(
        element.firstChild || element,
        Math.min(from, element.textContent?.length || 0),
    );
    range.setEnd(
        element.lastChild || element,
        Math.min(to, element.textContent?.length || 0),
    );
    const selection = document.getSelection();

    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
