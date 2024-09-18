import type {MaskitoPlugin} from '../types';

/**
 * Helper to scroll narrow textfield after programmatic updates of masked element.
 * It is rather hacky solution – that's why it should be enabled manually at your own risk.
 * ___
 * There are 2 issues solved by this plugin:
 *
 * - Case 1. Programmatic update of `element.value`
 * DOM contains already focused <input />.
 * It is narrow (only 3 characters can be fit inside it without scroll).
 * ```
 * const element = document.querySelector('input');
 *
 * element.value = '12345';
 * // caret is placed after the last digit, but it is not visible (no scroll happens)
 * ```
 *
 * - Case 2. Programmatic execution of `element.setSelectionRange`
 * DOM contains already focused <input value="12345" />.
 * It is narrow (only 3 characters can be fit inside it without scroll).
 * Caret is placed at the beginning.
 * ```
 * const element = document.querySelector('input');
 *
 * input.setSelectionRange(5, 5);
 * // caret is placed after the last digit, but it is not visible (no scroll happens)
 * ```
 * ___
 * - {@link https://issues.chromium.org/issues/41081857 Open Chromium bug from 2014}
 */
export function maskitoScrollPlugin(): MaskitoPlugin {
    return (element) => {
        const document = element.ownerDocument;

        const listener = (): void => {
            if (element.matches(':focus') && element.scrollWidth > element.clientWidth) {
                element.blur();
                element.focus();
            }
        };

        document.addEventListener('selectionchange', listener, {passive: true});

        return () => {
            document.removeEventListener('selectionchange', listener);
        };
    };
}
