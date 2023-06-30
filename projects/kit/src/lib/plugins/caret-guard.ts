import {MaskitoPlugin} from '@maskito/core';

import {clamp, getFocused} from '../utils';

export function maskitoCaretGuard(
    guard: (
        value: string,
        selection: readonly [from: number, to: number],
    ) => [from: number, to: number],
): MaskitoPlugin {
    return element => {
        const document = element.ownerDocument;
        const listener = (): void => {
            if (getFocused(document) !== element) {
                return;
            }

            const start = element.selectionStart || 0;
            const end = element.selectionEnd || 0;
            const [fromLimit, toLimit] = guard(element.value, [start, end]);

            if (fromLimit > start || toLimit < end) {
                element.setSelectionRange(
                    clamp(start, fromLimit, toLimit),
                    clamp(end, fromLimit, toLimit),
                );
            }
        };

        document.addEventListener('selectionchange', listener);

        return () => document.removeEventListener('selectionchange', listener);
    };
}
