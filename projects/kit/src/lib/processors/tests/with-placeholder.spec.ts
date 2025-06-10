import {describe, expect, it} from '@jest/globals';
import {maskitoPipe} from '@maskito/core';
import {maskitoWithPlaceholder} from '@maskito/kit';

describe('maskitoWithPlaceholder("dd/mm/yyyy")', () => {
    const {preprocessors, postprocessors} = maskitoWithPlaceholder('dd/mm/yyyy');
    const preprocessor = maskitoPipe(preprocessors);
    const postprocessor = maskitoPipe(postprocessors);
    const EMPTY_ELEMENT_STATE = {
        value: '',
        selection: [0, 0] as const,
    };

    describe('preprocessors', () => {
        /* eslint-disable jest/prefer-ending-with-an-expect */
        const check = (valueBefore: string, valueAfter: string): void => {
            const {elementState} = preprocessor(
                {
                    elementState: {
                        value: valueBefore,
                        selection: [0, 0] as const,
                    },
                    data: '',
                },
                'insert',
            );

            expect(elementState.value).toBe(valueAfter);
        };

        it('empty', () => check('', ''));

        it('2/mm/yyyy => 2', () => check('2d/mm/yyyy', '2'));

        it('26/mm/yyyy => 26', () => check('26/mm/yyyy', '26'));

        it('26/0m/yyyy => 26/0', () => check('26/0m/yyyy', '26/0'));

        it('26/01/yyyy => 26/01', () => check('26/01/yyyy', '26/01'));

        it('26/01/1yyy => 26/01/1', () => check('26/01/1yyy', '26/01/1'));

        it('26/01/19yy => 26/01/19', () => check('26/01/19yy', '26/01/19'));

        it('26/01/199y => 26/01/199', () => check('26/01/199y', '26/01/199'));

        it('26/01/1997 => 26/01/1997', () => check('26/01/1997', '26/01/1997'));
    });

    describe('postprocessors', () => {
        beforeEach(() => {
            // Reset side effects from other tests
            preprocessor({elementState: EMPTY_ELEMENT_STATE, data: ''}, 'validation');
        });

        describe('different initial element state (2nd argument of postprocessor)', () => {
            const ONLY_PLACEHOLDER_STATE = {
                value: 'dd/mm/yyyy',
                selection: [0, 0] as const,
            };

            [EMPTY_ELEMENT_STATE, ONLY_PLACEHOLDER_STATE].forEach((initialState) => {
                const check = (valueBefore: string, valueAfter: string): void => {
                    const {value} = postprocessor(
                        {
                            value: valueBefore,
                            selection: [0, 0] as const,
                        },
                        initialState,
                    );

                    expect(value).toBe(valueAfter);
                };

                describe(`Initial element value is "${initialState.value}"`, () => {
                    it('1 => 1d/mm/yyyy', () => check('1', '1d/mm/yyyy'));

                    it('16 => 16/mm/yyyy', () => check('16', '16/mm/yyyy'));

                    it('16/0 => 16/0m/yyyy', () => check('16/0', '16/0m/yyyy'));

                    it('16/05 => 16/05/yyyy', () => check('16/05', '16/05/yyyy'));

                    it('16/05/2 => 16/05/2yyy', () => check('16/05/2', '16/05/2yyy'));

                    it('16/05/20 => 16/05/20yy', () => check('16/05/20', '16/05/20yy'));

                    it('16/05/202 => 16/05/202y', () => check('16/05/202', '16/05/202y'));

                    it('16/05/2023 => 16/05/2023', () =>
                        check('16/05/2023', '16/05/2023'));
                });
            });

            describe('postprocessor gets empty value', () => {
                /**
                 * We can get this case only if textfield is updated programmatically.
                 * User can't erase symbols from already empty textfield.
                 */
                it('if initial state has empty value too => Empty', () => {
                    const {value} = postprocessor(
                        {
                            value: '',
                            selection: [0, 0] as const,
                        },
                        EMPTY_ELEMENT_STATE,
                    );

                    expect(value).toBe('');
                });

                it('initial value is not empty => placeholder', () => {
                    const {value} = postprocessor(
                        {
                            value: '',
                            selection: [0, 0] as const,
                        },
                        ONLY_PLACEHOLDER_STATE,
                    );

                    expect(value).toBe('dd/mm/yyyy');
                });
            });
        });
    });
});
