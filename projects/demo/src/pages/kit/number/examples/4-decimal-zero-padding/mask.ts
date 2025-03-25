import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export default maskitoNumberOptionsGenerator({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: '.',
    min: 0,
    prefix: '$',
});
