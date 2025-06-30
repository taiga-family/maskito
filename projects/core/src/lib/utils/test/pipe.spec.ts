import {describe, expect, it} from '@jest/globals';

import type {ElementState, MaskitoPostprocessor, MaskitoPreprocessor} from '../../types';
import {maskitoPipe} from '../pipe';

describe('maskitoPipe', () => {
    describe('Preprocessor', () => {
        const preprocessorData: Parameters<MaskitoPreprocessor>[0] = {
            elementState: {value: '2', selection: [2, 2]},
            data: '0',
        };

        const add0ToValue: MaskitoPreprocessor = ({elementState}) => ({
            elementState: {
                ...elementState,
                value: `${elementState.value}0`,
            },
        });
        const add1ToValue: MaskitoPreprocessor = ({elementState}) => ({
            elementState: {
                ...elementState,
                value: `${elementState.value}1`,
            },
        });
        const add5ToData: MaskitoPreprocessor = ({elementState, data}) => ({
            elementState,
            data: `${data}5`,
        });
        const add3ToData: MaskitoPreprocessor = ({elementState, data}) => ({
            elementState,
            data: `${data}3`,
        });

        it('take the last valid `data` if the previous processor did not modify it', () => {
            expect(
                maskitoPipe([add3ToData, add0ToValue, add5ToData])(
                    preprocessorData,
                    'insert',
                ),
            ).toEqual({
                elementState: {value: '20', selection: [2, 2]},
                data: '035',
            });
        });

        describe('Order matters', () => {
            it('for `elementState`', () => {
                expect(
                    maskitoPipe([add0ToValue, add1ToValue])(preprocessorData, 'insert'),
                ).toEqual({
                    elementState: {value: '201', selection: [2, 2]},
                    data: '0',
                });

                expect(
                    maskitoPipe([add1ToValue, add0ToValue])(preprocessorData, 'insert'),
                ).toEqual({
                    elementState: {value: '210', selection: [2, 2]},
                    data: '0',
                });
            });

            it('for `data`', () => {
                expect(
                    maskitoPipe([add3ToData, add5ToData])(preprocessorData, 'insert'),
                ).toEqual({
                    elementState: {value: '2', selection: [2, 2]},
                    data: '035',
                });

                expect(
                    maskitoPipe([add5ToData, add3ToData])(preprocessorData, 'insert'),
                ).toEqual({
                    elementState: {value: '2', selection: [2, 2]},
                    data: '053',
                });
            });

            it('for `elementState` & `data` in one pipe', () => {
                expect(
                    maskitoPipe([add5ToData, add0ToValue, add3ToData, add1ToValue])(
                        preprocessorData,
                        'insert',
                    ),
                ).toEqual({
                    elementState: {value: '201', selection: [2, 2]},
                    data: '053',
                });
            });
        });
    });

    describe('Postprocessor', () => {
        const initialElementState: Parameters<MaskitoPostprocessor>[1] = {
            value: '',
            selection: [0, 0],
        };
        const postprocessorData: Parameters<MaskitoPostprocessor>[0] = {
            value: '0',
            selection: [5, 5],
        };

        const add3: MaskitoPostprocessor = ({value, selection}) => ({
            selection,
            value: `${value}3`,
        });
        const add5: MaskitoPostprocessor = ({value, selection}) => ({
            selection,
            value: `${value}5`,
        });
        const doubleCaretIndex: MaskitoPostprocessor = ({value, selection}) => ({
            value,
            selection: [selection[0] * 2, selection[1] * 2],
        });
        const shiftCaretIndexBy5: MaskitoPostprocessor = ({value, selection}) => ({
            value,
            selection: [selection[0] + 5, selection[1] + 5],
        });

        describe('Order matters', () => {
            it('for `value`', () => {
                expect(
                    maskitoPipe([add3, add5])(postprocessorData, initialElementState),
                ).toEqual({
                    value: '035',
                    selection: [5, 5],
                });

                expect(
                    maskitoPipe([add5, add3])(postprocessorData, initialElementState),
                ).toEqual({
                    value: '053',
                    selection: [5, 5],
                });
            });

            it('for `selection`', () => {
                expect(
                    maskitoPipe([doubleCaretIndex, shiftCaretIndexBy5])(
                        postprocessorData,
                        initialElementState,
                    ),
                ).toEqual({
                    value: '0',
                    selection: [15, 15],
                });

                expect(
                    maskitoPipe([shiftCaretIndexBy5, doubleCaretIndex])(
                        postprocessorData,
                        initialElementState,
                    ),
                ).toEqual({
                    value: '0',
                    selection: [20, 20],
                });
            });

            it('for `value` & `selection` in one pipe', () => {
                expect(
                    maskitoPipe([add5, doubleCaretIndex, add3, shiftCaretIndexBy5])(
                        postprocessorData,
                        initialElementState,
                    ),
                ).toEqual({
                    value: '053',
                    selection: [15, 15],
                });
            });
        });
    });

    describe('Readonly arguments are passed to all processors', () => {
        const elementState: ElementState = {value: '', selection: [0, 0]};

        // eslint-disable-next-line jest/prefer-ending-with-an-expect
        it('preprocessor', () => {
            const checkActionType: MaskitoPreprocessor = (data, actionType) => {
                expect(actionType).toBe('deleteBackward');

                return data;
            };

            maskitoPipe([checkActionType, checkActionType, checkActionType])(
                {elementState, data: ''},
                'deleteBackward',
            );
        });

        // eslint-disable-next-line jest/prefer-ending-with-an-expect
        it('postprocessor', () => {
            const initialElementState: ElementState = {
                value: '27',
                selection: [2, 7],
            };

            const checkActionType: MaskitoPostprocessor = (data, actionType) => {
                expect(actionType).toEqual(initialElementState);

                return data;
            };

            maskitoPipe([checkActionType, checkActionType, checkActionType])(
                elementState,
                initialElementState,
            );
        });
    });
});
