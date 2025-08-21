import {describe, expect, it} from '@jest/globals';

import {maskitoPostfixPostprocessorGenerator} from '../postfix-postprocessor';

describe('maskitoPostfixPostprocessorGenerator', () => {
    const EMPTY_INPUT = {value: '', selection: [0, 0] as const};

    describe('postfix is a single character', () => {
        const postprocessor = maskitoPostfixPostprocessorGenerator('%');

        it('does not add postfix if input was initially empty', () => {
            expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
        });

        it('type 99 => 99%', () => {
            expect(
                postprocessor(
                    {value: '99', selection: [2, 2]}, // after changes
                    // percent sign was deleted by backspace
                    {value: '99%', selection: [3, 3]}, // before changes (initialElementState)
                ),
            ).toEqual({value: '99%', selection: [2, 2]});
        });

        it('paste 99% => 99% (no extra percent sign)', () => {
            expect(
                postprocessor(
                    {value: '99%', selection: [3, 3]}, // after
                    // paste from clipboard
                    EMPTY_INPUT, // before
                ),
            ).toEqual({value: '99%', selection: [3, 3]});
        });
    });

    describe('postfix consists of many characters', () => {
        describe('postfix=.00', () => {
            const postprocessor = maskitoPostfixPostprocessorGenerator('.00');

            it('does not add postfix if input was initially empty', () => {
                expect(postprocessor(EMPTY_INPUT, EMPTY_INPUT)).toEqual(EMPTY_INPUT);
            });

            it('type 100 => 100.00', () => {
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

        describe('postfix=_lbs_per_day', () => {
            const postprocessor = maskitoPostfixPostprocessorGenerator('_lbs_per_day');

            it('paste 100 + partially filled postfix => 100_lbs_per_day', () => {
                expect(
                    postprocessor(
                        {
                            value: '100_lbs',
                            selection: ['100_lbs'.length, '100_lbs'.length],
                        },
                        EMPTY_INPUT,
                    ),
                ).toEqual({
                    value: '100_lbs_per_day',
                    selection: ['100_lbs'.length, '100_lbs'.length],
                });
            });
        });
    });

    describe('postfix starts with the same character as other part of the value ends', () => {
        it('$_100_per_kg => $_|100_|per_kg (select all digits and underscore) => Delete => $_|_per_kg', () => {
            const postprocessor = maskitoPostfixPostprocessorGenerator('_per_kg');

            expect(
                postprocessor(
                    {value: '$_per_kg', selection: [2, 2]}, // after
                    {value: '$_100_per_kg', selection: ['$_'.length, '$_100_'.length]}, // initial
                ),
            ).toEqual({value: '$__per_kg', selection: [2, 2]});
        });

        it('$__100__per_kg => $__|100__|per_kg (select all digits and 2 underscore) => Delete => $__|__per_kg', () => {
            const postprocessor = maskitoPostfixPostprocessorGenerator('__per_kg');

            expect(
                postprocessor(
                    {value: '$__per_kg', selection: [3, 3]}, // after
                    {
                        value: '$__100__per_kg',
                        selection: ['$__'.length, '$__100__'.length],
                    }, // initial
                ),
            ).toEqual({value: '$____per_kg', selection: [3, 3]});
        });
    });
});
