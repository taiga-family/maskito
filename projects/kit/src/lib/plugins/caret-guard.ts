import type {MaskitoPlugin} from '@maskito/core';

import {clamp} from '../utils';
import {maskitoSelectionChangeHandler} from './selection-change';

export function maskitoCaretGuard(
    guard: (
        value: string,
        selection: readonly [from: number, to: number],
    ) => [from: number, to: number],
): MaskitoPlugin {
    return maskitoSelectionChangeHandler((element) => {
        if (!element.matches(':focus')) {
            return;
        }

        const start = element.selectionStart ?? 0;
        const end = element.selectionEnd ?? 0;
        const [fromLimit, toLimit] = guard(element.value, [start, end]);

        if (fromLimit > start || toLimit < end) {
            element.setSelectionRange(
                clamp(start, fromLimit, toLimit),
                clamp(end, fromLimit, toLimit),
            );
        }
    });
}
