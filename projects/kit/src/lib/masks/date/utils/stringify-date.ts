import {clamp, toDateString} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {toDateSegments} from './to-date-segments';
import {withDateDefaults} from './with-date-defaults';

export function maskitoStringifyDate(date: Date, params: MaskitoDateParams): string {
    const {mode, separator, min, max} = withDateDefaults(params);
    const {year, ...segments} = toDateSegments(clamp(date, min, max));

    return toDateString(
        {...segments, year: year.padStart(mode.match(/y/g)?.length ?? 0, '0')},
        {dateMode: mode.replaceAll('/', separator)},
    );
}
