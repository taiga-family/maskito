import {MaskPostprocessor, MaskPreprocessor} from '../../types';
import {maskitoPipe} from '../pipe';

describe('maskitoPipe', () => {
    describe('Preprocessor', () => {
        const preprocessorData: Parameters<MaskPreprocessor>[0] = {
            elementState: {value: '2', selection: [2, 2]},
            data: '0',
            actionType: 'insert',
        };

        const add0ToValue: MaskPreprocessor = ({elementState}) => ({
            elementState: {
                ...elementState,
                value: elementState.value + '0',
            },
        });
        const add1ToValue: MaskPreprocessor = ({elementState}) => ({
            elementState: {
                ...elementState,
                value: elementState.value + '1',
            },
        });
        const add5ToData: MaskPreprocessor = ({elementState, data}) => ({
            elementState,
            data: data + '5',
        });
        const add3ToData: MaskPreprocessor = ({elementState, data}) => ({
            elementState,
            data: data + '3',
        });

        it('take the last valid `data` if the previous processor did not modify it', () => {
            expect(
                maskitoPipe(add3ToData, add0ToValue, add5ToData)(preprocessorData),
            ).toEqual({
                elementState: {value: '20', selection: [2, 2]},
                data: '035',
                actionType: 'insert',
            });
        });

        describe('Order matters', () => {
            it('for `elementState`', () => {
                expect(maskitoPipe(add0ToValue, add1ToValue)(preprocessorData)).toEqual({
                    elementState: {value: '201', selection: [2, 2]},
                    data: '0',
                    actionType: 'insert',
                });

                expect(maskitoPipe(add1ToValue, add0ToValue)(preprocessorData)).toEqual({
                    elementState: {value: '210', selection: [2, 2]},
                    data: '0',
                    actionType: 'insert',
                });
            });

            it('for `data`', () => {
                expect(maskitoPipe(add3ToData, add5ToData)(preprocessorData)).toEqual({
                    elementState: {value: '2', selection: [2, 2]},
                    data: '035',
                    actionType: 'insert',
                });

                expect(maskitoPipe(add5ToData, add3ToData)(preprocessorData)).toEqual({
                    elementState: {value: '2', selection: [2, 2]},
                    data: '053',
                    actionType: 'insert',
                });
            });

            it('for `elementState` & `data` in one pipe', () => {
                expect(
                    maskitoPipe(
                        add5ToData,
                        add0ToValue,
                        add3ToData,
                        add1ToValue,
                    )(preprocessorData),
                ).toEqual({
                    elementState: {value: '201', selection: [2, 2]},
                    data: '053',
                    actionType: 'insert',
                });
            });
        });
    });

    describe('Postprocessor', () => {
        const postprocessorData: Parameters<MaskPostprocessor>[0] = {
            value: '0',
            selection: [5, 5],
        };

        const add3: MaskPostprocessor = ({value, selection}) => ({
            selection,
            value: value + '3',
        });
        const add5: MaskPostprocessor = ({value, selection}) => ({
            selection,
            value: value + '5',
        });
        const doubleCaretIndex: MaskPostprocessor = ({value, selection}) => ({
            value,
            selection: [selection[0] * 2, selection[1] * 2],
        });
        const shiftCaretIndexBy5: MaskPostprocessor = ({value, selection}) => ({
            value,
            selection: [selection[0] + 5, selection[1] + 5],
        });

        describe('Order matters', () => {
            it('for `value`', () => {
                expect(maskitoPipe(add3, add5)(postprocessorData)).toEqual({
                    value: '035',
                    selection: [5, 5],
                });

                expect(maskitoPipe(add5, add3)(postprocessorData)).toEqual({
                    value: '053',
                    selection: [5, 5],
                });
            });

            it('for `selection`', () => {
                expect(
                    maskitoPipe(doubleCaretIndex, shiftCaretIndexBy5)(postprocessorData),
                ).toEqual({
                    value: '0',
                    selection: [15, 15],
                });

                expect(
                    maskitoPipe(shiftCaretIndexBy5, doubleCaretIndex)(postprocessorData),
                ).toEqual({
                    value: '0',
                    selection: [20, 20],
                });
            });

            it('for `value` & `selection` in one pipe', () => {
                expect(
                    maskitoPipe(
                        add5,
                        doubleCaretIndex,
                        add3,
                        shiftCaretIndexBy5,
                    )(postprocessorData),
                ).toEqual({
                    value: '053',
                    selection: [15, 15],
                });
            });
        });
    });
});
