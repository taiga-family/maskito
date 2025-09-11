import {describe, expect, it} from '@jest/globals';
import type {MaskitoPostprocessor} from '@maskito/core';
import type {MaskitoNumberParams} from '@maskito/kit';

import {createLeadingZeroesValidationPostprocessor} from '../leading-zeroes-validation-postprocessor';

const DEFAULT_PARAMS = {
    prefix: '',
    postfix: '',
    minusPseudoSigns: [],
    decimalPseudoSeparators: [','] as string[], // TODO(v4): remove `as string[]`
    negativePattern: 'prefixFirst',
} as const satisfies MaskitoNumberParams;

describe('createLeadingZeroesValidationPostprocessor', () => {
    const DUMMY_INITIAL_STATE = {value: '', selection: [0, 0]} as const;
    const params: Parameters<typeof createLeadingZeroesValidationPostprocessor>[0] = {
        ...DEFAULT_PARAMS,
        decimalSeparator: ',',
        thousandSeparator: '',
        minusSign: '−',
    };
    let processor: MaskitoPostprocessor;

    const process = (
        value: string,
        selection: [number, number],
    ): {selection: readonly [number, number]; value: string} =>
        processor({value, selection}, DUMMY_INITIAL_STATE);

    beforeEach(() => {
        processor = createLeadingZeroesValidationPostprocessor(params);
    });

    it('0|0005 => |5', () => {
        const {value, selection} = process('00005', [1, 1]);

        expect(value).toBe('5');
        expect(selection).toEqual([0, 0]);
    });

    it('−0|0005 => −|5', () => {
        const {value, selection} = process('−00005', [2, 2]);

        expect(value).toBe('−5');
        expect(selection).toEqual([1, 1]);
    });

    it('0000,4|2 => 0,4|2', () => {
        const {value, selection} = process('0000,42', ['0000,4'.length, '0000,4'.length]);

        expect(value).toBe('0,42');
        expect(selection).toEqual([3, 3]);
    });

    it('−0000,4|2 => -0.4|2', () => {
        const {value, selection} = process('−0000,42', [
            '−0000,4'.length,
            '−0000,4'.length,
        ]);

        expect(value).toBe('−0,42');
        expect(selection).toEqual([4, 4]);
    });

    it('00005|,42 => 5|,42', () => {
        const {value, selection} = process('00005,42', ['00005'.length, '00005'.length]);

        expect(value).toBe('5,42');
        expect(selection).toEqual([1, 1]);
    });

    it('−0005,42| => -5,42|', () => {
        const {value, selection} = process('−00005,42', [
            '−00005,42'.length,
            '−00005,42'.length,
        ]);

        expect(value).toBe('−5,42');
        expect(selection).toEqual(['−5,42'.length, '−5,42'.length]);
    });

    it('empty string => empty string', () => {
        const {value, selection} = process('', [0, 0]);

        expect(value).toBe('');
        expect(selection).toEqual([0, 0]);
    });

    it('− => -', () => {
        const {value, selection} = process('−', [1, 1]);

        expect(value).toBe('−');
        expect(selection).toEqual([1, 1]);
    });

    describe('with prefix', () => {
        it('$0000,4|2 => 0,4|2', () => {
            processor = createLeadingZeroesValidationPostprocessor({
                ...params,
                prefix: '$',
            });
            const {value, selection} = process('$0000,42', [
                '$0000,4'.length,
                '$0000,4'.length,
            ]);

            expect(value).toBe('$0,42');
            expect(selection).toEqual([4, 4]);
        });

        it('$ 0000,4|2 => 0,4|2', () => {
            processor = createLeadingZeroesValidationPostprocessor({
                ...params,
                prefix: '$ ',
            });
            const {value, selection} = process('$ 0000,42', [
                '$ 0000,4'.length,
                '$ 0000,4'.length,
            ]);

            expect(value).toBe('$ 0,42');
            expect(selection).toEqual([5, 5]);
        });
    });
});
