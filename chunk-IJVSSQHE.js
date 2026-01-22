import"./chunk-TIC6Q35B.js";var o=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {
    maskitoCaretGuard,
    maskitoEventHandler,
    maskitoNumberOptionsGenerator,
} from '@maskito/kit';

export const postfix = '%';
const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator({
    postfix,
    min: 0,
    max: 100,
    maximumFractionDigits: 2,
});

export default {
    ...numberOptions,
    plugins: [
        ...plugins,
        // Forbids caret to be placed after postfix
        maskitoCaretGuard((value) => [0, value.length - 1]),
        maskitoEventHandler('blur', (element) => {
            if (element.value === postfix) {
                maskitoUpdateElement(element, \`0\${postfix}\`);
            }
        }),
    ],
} satisfies MaskitoOptions;
`;export{o as default};
