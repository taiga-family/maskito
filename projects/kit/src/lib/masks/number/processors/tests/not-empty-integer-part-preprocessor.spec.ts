import {MaskitoPreprocessorAction} from '@maskito/core';

import {createNotEmptyIntegerPartPreprocessor} from '../not-empty-integer-part-preprocessor';

const EMPTY_ELEMENT_STATE = {
    value: '',
    selection: [0, 0] as const,
};

describe('createNotEmptyIntegerPartPreprocessor', () => {
    describe('precision === 2', () => {
        const preprocessor = createNotEmptyIntegerPartPreprocessor({
            decimalSeparator: ',',
            precision: 2,
        });

        it('should pad integer part with zero if user inserts "a,"', () => {
            expect(
                preprocessor(
                    {
                        elementState: EMPTY_ELEMENT_STATE,
                        data: 'a,',
                    },
                    MaskitoPreprocessorAction.Insert,
                ),
            ).toEqual({
                elementState: EMPTY_ELEMENT_STATE,
                data: '0a,',
            });
        });

        it('should NOT pad integer part with zero if user inserts "aaa1aaa,"', () => {
            expect(
                preprocessor(
                    {
                        elementState: EMPTY_ELEMENT_STATE,
                        data: 'aaa1aaa,',
                    },
                    MaskitoPreprocessorAction.Insert,
                ),
            ).toEqual({
                elementState: EMPTY_ELEMENT_STATE,
                data: 'aaa1aaa,',
            });
        });

        it('should pad integer part with zero if user inserts ",3123"', () => {
            expect(
                preprocessor(
                    {
                        elementState: EMPTY_ELEMENT_STATE,
                        data: ',3123',
                    },
                    MaskitoPreprocessorAction.Insert,
                ),
            ).toEqual({
                elementState: EMPTY_ELEMENT_STATE,
                data: '0,3123',
            });
        });

        it('should NOT pad integer part with zero if user inserts "aaa0aaa,3123"', () => {
            expect(
                preprocessor(
                    {
                        elementState: EMPTY_ELEMENT_STATE,
                        data: 'aaa0aaa,3123',
                    },
                    MaskitoPreprocessorAction.Insert,
                ),
            ).toEqual({
                elementState: EMPTY_ELEMENT_STATE,
                data: 'aaa0aaa,3123',
            });
        });
    });
});
