import"./chunk-TIC6Q35B.js";var a=`import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsMask = Array.from(value.replaceAll('%', '')).map(() => /\\d/);

        return digitsMask.length ? [...digitsMask, '%'] : [/\\d/];
    },
} satisfies MaskitoOptions;
`;export{a as default};
