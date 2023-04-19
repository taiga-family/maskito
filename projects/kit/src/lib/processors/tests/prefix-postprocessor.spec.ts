import {maskitoPrefixPostprocessorGenerator} from '../prefix-postprocessor';

describe('maskitoPrefixPostprocessorGenerator', () => {
    const EMPTY_INPUT = {value: '', selection: [0, 0] as const};

    describe('prefix is a single character', () => {
        const postprocessor = maskitoPrefixPostprocessorGenerator('$');

        it('does not add prefix if input was initially empty', () => {
            expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
        });

        it('123 => $|123', () => {
            expect(
                postprocessor(
                    {value: '123', selection: [0, 0]}, // after changes
                    // percent sign was deleted by backspace
                    {value: '$123', selection: [1, 1]}, // before changes
                ),
            ).toEqual({value: '$123', selection: [1, 1]});
        });

        it('Paste $123 => $123 (no extra dollar sign)', () => {
            expect(
                postprocessor(
                    {value: '$123', selection: [4, 4]}, // after
                    // // paste from clipboard
                    EMPTY_INPUT, // before
                ),
            ).toEqual({value: '$123', selection: [4, 4]});
        });
    });

    describe('prefix consists of many characters', () => {
        const postprocessor = maskitoPrefixPostprocessorGenerator('kg ');

        it('does not add prefix if input was initially empty', () => {
            expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
        });

        it('123 => kg |123', () => {
            expect(
                postprocessor(
                    {value: '123', selection: [0, 0]}, // after
                    // all characters from prefix was deleted
                    {value: 'kg 123', selection: [3, 3]}, // before
                ),
            ).toEqual({value: 'kg 123', selection: [3, 3]});
        });

        it('g 123 => kg |123', () => {
            expect(
                postprocessor(
                    {value: 'g 123', selection: [0, 0]}, // after
                    // leading character from prefix was deleted
                    {value: 'kg 123', selection: [1, 1]}, // before
                ),
            ).toEqual({value: 'kg 123', selection: [1, 1]});
        });

        it(' 123 => kg |123', () => {
            expect(
                postprocessor(
                    {value: ' 123', selection: [0, 0]}, // after
                    // some characters from prefix was deleted
                    {value: 'kg 123', selection: [2, 2]}, // before
                ),
            ).toEqual({value: 'kg 123', selection: [2, 2]});
        });
    });
});
