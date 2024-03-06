import type {MaskitoDateSegments} from '../../types';

export const getDateSegmentValueLength: (
    dateString: string,
) => MaskitoDateSegments<number> = (dateString: string) => ({
    day: dateString.match(/d/g)?.length || 0,
    month: dateString.match(/m/g)?.length || 0,
    year: dateString.match(/y/g)?.length || 0,
});
