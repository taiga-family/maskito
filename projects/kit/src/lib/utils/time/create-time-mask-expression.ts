import {CHAR_NO_BREAK_SPACE, TIME_FIXED_CHARACTERS} from '../../constants';
import type {MaskitoTimeParams} from '../../masks/time/time-params';

export function createTimeMaskExpression({
    mode,
    separators,
}: Required<Pick<MaskitoTimeParams, 'mode' | 'separators'>>): ReadonlyArray<
    RegExp | string
> {
    let separatorIndex = 0;

    return Array.from(mode.replace(' AA', ''))
        .flatMap<RegExp | string>((char) =>
            TIME_FIXED_CHARACTERS.includes(char)
                ? Array.from(separators[separatorIndex++]!)
                : [/\d/],
        )
        .concat(mode.includes('AA') ? [CHAR_NO_BREAK_SPACE, /[AP]/i, /M/i] : []);
}
