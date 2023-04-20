import {maskitoPostfixPostprocessorGenerator} from '../postfix-postprocessor';

describe('maskitoPostfixPostprocessorGenerator', () => {
    const EMPTY_INPUT = {value: '', selection: [0, 0] as const};

    describe('prefix is a single character', () => {
        const postprocessor = maskitoPostfixPostprocessorGenerator('%');

        it('does not add prefix if input was initially empty', () => {
            expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
        });

        it('Type 99 => 99%', () => {
            expect(
                postprocessor(
                    {value: '99', selection: [2, 2]}, // after changes
                    // percent sign was deleted by backspace
                    {value: '99%', selection: [3, 3]}, // before changes (initialElementState)
                ),
            ).toEqual({value: '99%', selection: [2, 2]});
        });

        it('Paste 99% => 99% (no extra percent sign)', () => {
            expect(
                postprocessor(
                    {value: '99%', selection: [3, 3]}, // after
                    // paste from clipboard
                    EMPTY_INPUT, // before
                ),
            ).toEqual({value: '99%', selection: [3, 3]});
        });
    });

    describe('prefix consists of many characters', () => {
        const postprocessor = maskitoPostfixPostprocessorGenerator('.00');

        it('does not add prefix if input was initially empty', () => {
            expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
        });

        it('Type 100 => 100.00', () => {
            expect(
                postprocessor(
                    {value: '100', selection: [3, 3]}, // after
                    EMPTY_INPUT, // before
                ),
            ).toEqual({value: '100.00', selection: [3, 3]});
        });

        it('100.0 => 100.00', () => {
            expect(
                postprocessor(
                    {value: '100.0', selection: [5, 5]}, // after
                    // attempt to delete character from postfix
                    {value: '100.00', selection: [6, 6]}, // before
                ),
            ).toEqual({value: '100.00', selection: [5, 5]});
        });

        it('100. => 100.00', () => {
            expect(
                postprocessor(
                    {value: '100.', selection: [4, 4]}, // after
                    // attempt to delete many characters from postfix
                    {value: '100.00', selection: [6, 6]}, // before
                ),
            ).toEqual({value: '100.00', selection: [4, 4]});
        });
    });
});
