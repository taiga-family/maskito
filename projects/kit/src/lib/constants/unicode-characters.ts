/**
 * {@link https://unicode-table.com/en/00A0/ Non-breaking space}.
 */
export const CHAR_NO_BREAK_SPACE = `\u00A0`;

/**
 * {@link https://unicode-table.com/en/2013/ EN dash}
 * is used to indicate a range of numbers or a span of time.
 * @example 2006–2022
 */
export const CHAR_EN_DASH = `\u2013`;

/**
 * {@link https://unicode-table.com/en/2014/ EM dash}
 * is used to mark a break in a sentence.
 * @example Taiga UI — powerful set of open source components for Angular
 * ___
 * Don't confuse with {@link CHAR_EN_DASH} or {@link CHAR_HYPHEN}!
 */
export const CHAR_EM_DASH = `\u2014`;

/**
 * {@link https://unicode-table.com/en/002D/ Hyphen (minus sign)}
 * is used to combine words.
 * @example well-behaved
 * ___
 * Don't confuse with {@link CHAR_EN_DASH} or {@link CHAR_EM_DASH}!
 */
export const CHAR_HYPHEN = `\u002D`;

/**
 * {@link https://unicode-table.com/en/2212/ Minus}
 * is used as math operator symbol or before negative digits.
 * ---
 * Can be used as `&minus;`. Don't confuse with {@link CHAR_HYPHEN}
 */
export const CHAR_MINUS = `\u2212`;
