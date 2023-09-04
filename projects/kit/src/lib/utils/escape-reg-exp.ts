/**
 * Copy-pasted solution from lodash
 * @see https://lodash.com/docs/4.17.15#escapeRegExp
 */

const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = new RegExp(reRegExpChar.source);

export function escapeRegExp(str: string): string {
    return str && reHasRegExpChar.test(str) ? str.replace(reRegExpChar, '\\$&') : str;
}
