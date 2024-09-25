import {CHAR_NO_BREAK_SPACE, TIME_FIXED_CHARACTERS} from '../../constants';
import type {MaskitoTimeMode} from '../../types';

export function createTimeMaskExpression(mode: MaskitoTimeMode): Array<RegExp | string> {
    return Array.from(mode.replace(' AA', ''))
        .map((char) => (TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/))
        .concat(mode.includes('AA') ? [CHAR_NO_BREAK_SPACE, /[AP]/i, /M/i] : []);
}
