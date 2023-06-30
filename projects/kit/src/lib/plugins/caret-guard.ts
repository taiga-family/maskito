import {MaskitoPlugin} from '@maskito/core';

import {clamp, getFocused} from '../utils';

export function maskitoCaretGuard(
    guard: (value: string) => [from: number, to: number],
): MaskitoPlugin {
    return element => {
        const document = element.ownerDocument;
        const listener = (): void => {
            if (getFocused(document) !== element) {
                return;
            }

            const start = element.selectionStart || 0;
            const end = element.selectionEnd || 0;
            const [fromLimit, toLimit] = guard(element.value);

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
