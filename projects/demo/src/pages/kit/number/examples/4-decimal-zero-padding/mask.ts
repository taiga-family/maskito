import {maskitoNumber} from '@maskito/kit';

export default maskitoNumber({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: '.',
    min: 0,
    prefix: '$',
});
