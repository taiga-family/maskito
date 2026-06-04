import"./chunk-TIC6Q35B.js";var o=`import {maskitoChangeEventPlugin, type MaskitoOptions} from '@maskito/core';
import {maskitoNumber} from '@maskito/kit';

const numberOptions = maskitoNumber({maximumFractionDigits: 2});

export default {
    ...numberOptions,
    plugins: [
        ...numberOptions.plugins,
        maskitoChangeEventPlugin(), // <--- Enable it
    ],
} satisfies MaskitoOptions;
`;export{o as default};
