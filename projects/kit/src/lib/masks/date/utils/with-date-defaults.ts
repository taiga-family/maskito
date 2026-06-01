import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../constants';
import type {MaskitoDateParams} from '../date-params';
import {getLocaleDateParams} from './get-locale-date-params';

export function withDateDefaults({
    locale = '',
    mode,
    separator,
    min = DEFAULT_MIN_DATE,
    max = DEFAULT_MAX_DATE,
}: MaskitoDateParams): Required<MaskitoDateParams> {
    const localeParams = locale ? getLocaleDateParams(locale) : null;

    return {
        locale,
        mode: mode ?? localeParams?.mode ?? 'dd/mm/yyyy',
        separator: separator ?? localeParams?.separator ?? '.',
        min,
        max,
    };
}
