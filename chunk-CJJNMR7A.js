import"./chunk-6M32EY24.js";var i=`import type {MaskitoOptions} from '@maskito/core';

export default {
    mask: ({value}) => {
        const digitsMask = Array.from(value.replaceAll('%', '')).map(() => /\\d/);

        if (!digitsMask.length) {
            return [/\\d/];
        }

        return [...digitsMask, '%'];
    },
} satisfies MaskitoOptions;
`;export{i as default};
