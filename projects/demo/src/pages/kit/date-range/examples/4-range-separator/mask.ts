import {maskitoDateRangeOptionsGenerator} from '@maskito/kit';

export default maskitoDateRangeOptionsGenerator({
    mode: 'dd/mm/yyyy',
    minLength: {day: 3},
    maxLength: {month: 1},
    rangeSeparator: ' ~ ',
});
