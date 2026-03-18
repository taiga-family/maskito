import {maskitoNumberOptionsGenerator, type MaskitoNumberParams} from '@maskito/kit';

const japaneseYenGrouping: MaskitoNumberParams['thousandSeparatorPattern'] = (digits) =>
    digits.match(/\d{1,4}(?=(?:\d{4})*$)/g) ?? [];

export default maskitoNumberOptionsGenerator({
    prefix: '¥',
    thousandSeparator: ',',
    thousandSeparatorPattern: japaneseYenGrouping,
});
