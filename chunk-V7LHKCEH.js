import"./chunk-TIC6Q35B.js";var n=`import type {
    /**
     * HTMLElement + some common properties from:
     * - HTMLInputElement
     * - HTMLTextAreaElement
     * - [contenteditable]
     */
    MaskitoElement,
    MaskitoOptions,
} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

export default {
    mask: /^\\d*(?:\\.\\d*)?$/,
    plugins: [
        (element: MaskitoElement, _: MaskitoOptions) => {
            const blurHandler = (): void => {
                if (element.value.startsWith('.')) {
                    /**
                     * \u274C Anti-Pattern:
                     * \`\`\`
                     * element.value = \`0\${element.value}\`;
                     * \`\`\`
                     */
                    maskitoUpdateElement(element, \`0\${element.value}\`);
                }
            };

            element.addEventListener('blur', blurHandler);

            // register a clean-up callback that is invoked when the mask is destroyed
            return () => element.removeEventListener('blur', blurHandler);
        },
    ],
} satisfies MaskitoOptions;
`;export{n as default};
