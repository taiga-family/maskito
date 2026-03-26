import {
    /**
     * HTMLElement + some common properties from:
     * - HTMLInputElement
     * - HTMLTextAreaElement
     * - [contenteditable]
     */
    type MaskitoElement,
    type MaskitoOptions,
    maskitoUpdateElement,
} from '@maskito/core';

export default {
    mask: /^\d*(?:\.\d*)?$/,
    plugins: [
        (element: MaskitoElement, _: MaskitoOptions) => {
            const blurHandler = (): void => {
                if (element.value.startsWith('.')) {
                    /**
                     * ❌ Anti-Pattern:
                     * ```
                     * element.value = `0${element.value}`;
                     * ```
                     */
                    maskitoUpdateElement(element, `0${element.value}`);
                }
            };

            element.addEventListener('blur', blurHandler);

            // register a clean-up callback that is invoked when the mask is destroyed
            return () => element.removeEventListener('blur', blurHandler);
        },
    ],
} satisfies MaskitoOptions;
