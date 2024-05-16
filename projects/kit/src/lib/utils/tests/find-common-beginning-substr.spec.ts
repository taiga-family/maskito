import {describe, expect, it} from '@jest/globals';

import {findCommonBeginningSubstr} from '../find-common-beginning-substr';

describe('findCommonBeginningSubstr', () => {
    it('returns common substring until all characters are equal', () => {
        expect(findCommonBeginningSubstr('123_456', '123456')).toBe('123');
    });

    it('returns empty string if any string is empty', () => {
        expect(findCommonBeginningSubstr('123_456', '')).toBe('');
        expect(findCommonBeginningSubstr('', '123_456')).toBe('');
    });

    it('returns empty string if the first characters are different', () => {
        expect(findCommonBeginningSubstr('012345', '123')).toBe('');
    });

    it('returns the whole string if all characters are equal', () => {
        expect(findCommonBeginningSubstr('777999', '777999')).toBe('777999');
    });
});
