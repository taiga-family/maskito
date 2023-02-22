import {maskitoDateTimeOptionsGenerator} from '@maskito/kit';

export default maskitoDateTimeOptionsGenerator({
    dateMode: 'dd/mm/yyyy',
    timeMode: 'HH:MM',
    dateSeparator: '-',
    min: new Date(2010, 1, 15, 12, 30, 0),
    max: new Date(2020, 8, 15, 18, 30, 0),
});
