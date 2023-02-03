import {MaskitoDateSegments} from '../../types';

export const getDateSegmentValueLength: (
    dateString: string,
) => MaskitoDateSegments<number> = (dateString: string) => ({
    day: dateString.match('/d/g')?.length || 2,
    month: dateString.match('/m/g')?.length || 2,
    year: dateString.match('/y/g')?.length || 4,
});
