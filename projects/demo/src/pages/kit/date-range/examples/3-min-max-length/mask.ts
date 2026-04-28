import {maskitoDateRange} from '@maskito/kit';

export default maskitoDateRange({
    mode: 'dd/mm/yyyy',
    minLength: {day: 3},
    maxLength: {month: 1},
});
