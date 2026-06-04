import"./chunk-TIC6Q35B.js";var r=`import {maskitoNumber, type MaskitoNumberParams} from '@maskito/kit';

const japaneseYenGrouping: MaskitoNumberParams['thousandSeparatorPattern'] = (digits) =>
    digits.match(/\\d{1,4}(?=(?:\\d{4})*$)/g) ?? [];

export default maskitoNumber({
    prefix: '\xA5',
    thousandSeparator: ',',
    thousandSeparatorPattern: japaneseYenGrouping,
});
`;export{r as default};
