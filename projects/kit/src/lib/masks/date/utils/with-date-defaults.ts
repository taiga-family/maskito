import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import {segmentsToDate} from '../../../utils';
import type {MaskitoDateParams} from '../date-params';
import {getLocaleDateParams} from './get-locale-date-params';

export function maskitoWithDateDefaults({
    locale = '',
    mode,
    separator,
    min,
    max = DEFAULT_MAX_DATE,
}: MaskitoDateParams): Required<MaskitoDateParams> {
    const localeParams = locale ? getLocaleDateParams(locale) : null;
    const dateMode = mode ?? localeParams?.mode ?? 'dd/mm/yyyy';

    return {
        locale,
        mode: dateMode,
        separator: separator ?? localeParams?.separator ?? '.',
        min:
            min ??
            (dateMode.includes('y') ? DEFAULT_MIN_DATE : segmentsToDate({year: '0'})),
        max,
    };
}
