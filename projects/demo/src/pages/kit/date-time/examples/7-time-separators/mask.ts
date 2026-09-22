import {maskitoDateTime} from '@maskito/kit';

export default maskitoDateTime({
    dateMode: 'yyyy/mm/dd',
    dateSeparator: '-',
    dateTimeSeparator: ' ',
    timeMode: 'HH:MM:SS',
    // fr-CA style: "2025-05-10 18 h 30 min 05"
    timeSeparators: [' h ', ' min '],
});
