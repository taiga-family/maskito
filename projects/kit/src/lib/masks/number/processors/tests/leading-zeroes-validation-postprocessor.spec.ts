import {createLeadingZeroesValidationPostprocessor} from '../leading-zeroes-validation-postprocessor';

describe('createLeadingZeroesValidationPostprocessor', () => {
    const processor = createLeadingZeroesValidationPostprocessor(',', '');
    const DYMMY_INITIAL_STATE = {value: '', selection: [0, 0]} as const;

    const process = (
        value: string,
        selection: [number, number],
    ): {value: string; selection: readonly [number, number]} =>
        processor({value, selection}, DYMMY_INITIAL_STATE);

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

    it('$0000,4|2 => 0,4|2', () => {
        const {value, selection} = process('$0000,42', [
            '$0000,4'.length,
            '$0000,4'.length,
        ]);

        expect(value).toBe('$0,42');
        expect(selection).toEqual([4, 4]);
    });

    it('$ 0000,4|2 => 0,4|2', () => {
        const {value, selection} = process('$ 0000,42', [
            '$ 0000,4'.length,
            '$ 0000,4'.length,
        ]);

        expect(value).toBe('$ 0,42');
        expect(selection).toEqual([5, 5]);
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

    it('Empty string => Empty string', () => {
        const {value, selection} = process('', [0, 0]);

        expect(value).toBe('');
        expect(selection).toEqual([0, 0]);
    });

    it('− => -', () => {
        const {value, selection} = process('−', [1, 1]);

        expect(value).toBe('−');
        expect(selection).toEqual([1, 1]);
    });
});
