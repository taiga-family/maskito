import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export default maskitoNumberOptionsGenerator({
    decimalZeroPadding: true,
    precision: 2,
    decimalSeparator: '.',
    isNegativeAllowed: false,
    prefix: '$',
});
