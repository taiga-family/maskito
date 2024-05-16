import {describe, expect, it} from '@jest/globals';

import {toHalfWidthNumber} from '../to-half-width-number';

describe('`toHalfWidthNumber` utility converts full width numbers to half width numbers', () => {
    const tests = [
        // [full width value, half width value]
        ['１', '1'],
        ['２', '2'],
        ['３', '3'],
        ['４', '4'],
        ['５', '5'],
        ['６', '6'],
        ['７', '7'],
        ['８', '8'],
        ['９', '9'],
    ] as const;

    tests.forEach(([fullWidthValue, halfWidthValue]) => {
        it(`${fullWidthValue} => ${halfWidthValue}`, () => {
            expect(toHalfWidthNumber(fullWidthValue)).toBe(halfWidthValue);
        });
    });

    it('１２３４５６ => 123456', () => {
        expect(toHalfWidthNumber('１２３４５６')).toBe('123456');
    });

    it('１2３4５6 (full width + half width mix) => 123456', () => {
        expect(toHalfWidthNumber('１2３4５6')).toBe('123456');
    });
});
