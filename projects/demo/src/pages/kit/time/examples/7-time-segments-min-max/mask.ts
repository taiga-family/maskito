import {maskitoTime} from '@maskito/kit';

export default maskitoTime({
    mode: 'HH:MM',
    timeSegmentMaxValues: {hours: 12},
    timeSegmentMinValues: {hours: 1},
});
