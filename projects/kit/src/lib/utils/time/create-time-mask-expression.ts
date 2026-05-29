import {CHAR_NO_BREAK_SPACE, TIME_FIXED_CHARACTERS} from '../../constants';
import type {MaskitoTimeParams} from '../../masks/time/time-params';
import {escapeRegExp} from '../escape-reg-exp';
import {hasDayPeriod} from './day-period';

export function createTimeMaskExpression({
    mode,
    separators,
    dayPeriod,
}: Required<Pick<MaskitoTimeParams, 'dayPeriod' | 'mode' | 'separators'>>): ReadonlyArray<
    RegExp | string
> {
    let separatorIndex = 0;

    return Array.from(mode.replace(' AA', ''))
        .flatMap<RegExp | string>((char) =>
            TIME_FIXED_CHARACTERS.includes(char)
                ? Array.from(separators[separatorIndex++]!)
                : [/\d/],
        )
        .concat(
            hasDayPeriod(dayPeriod)
                ? [
                      CHAR_NO_BREAK_SPACE,
                      ...dayPeriod[0]
                          .split('')
                          .map(escapeRegExp)
                          .map(
                              (am, i) =>
                                  new RegExp(
                                      `[${am}${escapeRegExp(dayPeriod[1][i]!)}]`,
                                      'i',
                                  ),
                          ),
                  ]
                : [],
        );
}
