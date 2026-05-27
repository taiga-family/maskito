import {maskitoTime} from '@maskito/kit';

export default maskitoTime({
    mode: 'HH:MM:SS.MSS',
    // fr-CA style: "18 h 05 min 05,766"
    separators: [' h ', ' min ', ','],
});
