import {MaskitoPlugin} from '@maskito/core';

import {getFocused} from '../utils';

export function maskitoCaretGuard(
    guard: (value: string) => [from: number, to: number],
): MaskitoPlugin {
    return (element: HTMLInputElement | HTMLTextAreaElement): (() => void) => {
        const document = element.ownerDocument;
        const listener = (): void => {
            if (getFocused(document) !== element) {
                return;
            }

            const start = element.selectionStart || 0;
            const end = element.selectionEnd || 0;
            const [from, to] = guard(element.value);

            if (from > start || to < end) {
                element.setSelectionRange(Math.max(from, start), Math.min(to, end));
            }
        };

        document.addEventListener('selectionchange', listener);

        return () => document.removeEventListener('selectionchange', listener);
    };
}
