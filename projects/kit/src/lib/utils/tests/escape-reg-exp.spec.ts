import {describe, expect, it} from '@jest/globals';

import {CHAR_HYPHEN, CHAR_MINUS} from '../../constants';
import {escapeRegExp} from '../escape-reg-exp';

describe('escapeRegExp', () => {
    it('escapes dot', () => {
        const rawRegExpStr = 'a.b';
        const escaped = escapeRegExp(rawRegExpStr);
        const testString = '-abb-a.b-';

        expect(escaped).toBe(String.raw`a\.b`);
        expect(testString.replace(new RegExp(escaped), '')).toBe('-abb--');
        expect(testString.replace(new RegExp(rawRegExpStr), '')).toBe('--a.b-');
    });

    it('escapes dollar sign', () => {
        const rawRegExpStr = '10$';
        const escaped = escapeRegExp(rawRegExpStr);
        const testString = '-10$-10';

        expect(escaped).toBe(String.raw`10\$`);
        expect(testString.replace(new RegExp(escaped), '')).toBe('--10');
        expect(testString.replace(new RegExp(rawRegExpStr), '')).toBe('-10$-');
    });

    it('escapes plus', () => {
        const rawRegExpStr = '+';
        const escaped = escapeRegExp(rawRegExpStr);
        const testString = '+42';

        expect(escaped).toBe(String.raw`\+`);
        expect(testString.replace(new RegExp(escaped), '')).toBe('42');

        expect(() =>
            // eslint-disable-next-line regexp/no-invalid-regexp
            testString.replace(new RegExp(rawRegExpStr), ''),
        ).toThrow(new SyntaxError('Invalid regular expression: /+/: Nothing to repeat'));
    });

    describe('Symbols which do not require escaping', () => {
        it('minus', () => {
            expect(escapeRegExp(CHAR_MINUS)).toBe(CHAR_MINUS);
            expect(`${CHAR_MINUS}42`.replace(new RegExp(CHAR_MINUS), '')).toBe('42');
        });

        it('hyphen', () => {
            expect(escapeRegExp(CHAR_HYPHEN)).toBe(CHAR_HYPHEN);
            expect(`${CHAR_HYPHEN}42`.replace(new RegExp(CHAR_HYPHEN), '')).toBe('42');
        });
    });
});
