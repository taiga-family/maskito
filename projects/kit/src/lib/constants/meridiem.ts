import {CHAR_NO_BREAK_SPACE} from './unicode-characters';

export const ANY_MERIDIEM_CHARACTER_RE = new RegExp(`[${CHAR_NO_BREAK_SPACE}APM]+$`, 'g');
export const ALL_MERIDIEM_CHARACTERS_RE = new RegExp(`${CHAR_NO_BREAK_SPACE}[AP]M$`, 'g');
