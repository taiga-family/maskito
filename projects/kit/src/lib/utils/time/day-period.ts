import {CHAR_NO_BREAK_SPACE} from '../../constants';
import {type MaskitoTimeParams} from '../../masks/time/time-params';
import {escapeRegExp} from '../escape-reg-exp';

export function hasDayPeriod(
    dayPeriod: Required<MaskitoTimeParams>['dayPeriod'],
): boolean {
    return dayPeriod.every(Boolean);
}

export function createDayPeriodMatchers(
    dayPeriod: Required<MaskitoTimeParams>['dayPeriod'],
): {
    readonly anyDayPeriodCharRE: RegExp;
    readonly fullDayPeriodRE: RegExp;
    readonly initialCharRE: RegExp;
} {
    const [am, pm] = dayPeriod;
    const uniqueChars = [...new Set([...am, ...pm])].map(escapeRegExp).join('');

    return {
        anyDayPeriodCharRE: new RegExp(`[${CHAR_NO_BREAK_SPACE}${uniqueChars}]+$`, 'gi'),
        fullDayPeriodRE: new RegExp(
            `${CHAR_NO_BREAK_SPACE}(?:${escapeRegExp(am)}|${escapeRegExp(pm)})$`,
            'gi',
        ),
        initialCharRE: new RegExp(
            `^[${escapeRegExp(am[0]!)}${escapeRegExp(pm[0]!)}]$`,
            'i',
        ),
    };
}
