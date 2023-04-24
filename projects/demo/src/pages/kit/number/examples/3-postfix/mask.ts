import {maskitoNumberOptionsGenerator} from '@maskito/kit';

export default maskitoNumberOptionsGenerator({
    isNegativeAllowed: false,
    precision: 2,
    max: 100,
    postfix: '%',
});
