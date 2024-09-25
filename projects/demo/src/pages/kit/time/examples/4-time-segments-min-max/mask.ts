import {maskitoTimeOptionsGenerator} from '@maskito/kit';

export default maskitoTimeOptionsGenerator({
    mode: 'HH:MM',
    timeSegmentMaxValues: {hours: 12},
    timeSegmentMinValues: {hours: 1},
});
