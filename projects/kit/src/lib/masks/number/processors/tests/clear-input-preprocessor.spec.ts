import type {ElementState, SelectionRange} from '../../../../../../../core/src/lib/types';
import {createClearInputPreprocessor} from '../clear-input-preprocessor';

describe('createClearInputPreprocessor', () => {
    describe('correctly works with prefix and postfix', () => {
        describe('precision = 2', () => {
            const processor = createClearInputPreprocessor({
                decimalSeparator: '.',
                decimalZeroPadding: true,
                minusSign: '-',
                prefix: '$$',
                postfix: ' per day',
                precision: 2,
            });

            const process = (
                value: string,
                selection: SelectionRange,
                type: 'deleteBackward' | 'deleteForward',
            ): ElementState =>
                processor({elementState: {value, selection}, data: ''}, type)
                    .elementState;

            it('$$4|3.0|0 per day => deleteBackward => $$4|.00 per day', () => {
                const {value, selection} = process(
                    '$$43.00 per day',
                    [3, 6],
                    'deleteBackward',
                );

                expect(value).toBe('$$4.00 per day');
                expect(selection).toEqual([3, 3]);
            });

            it('$$4|3.0|0 per day => deleteForward => $$4|.00 per day', () => {
                const {value, selection} = process(
                    '$$43.00 per day',
                    [3, 6],
                    'deleteForward',
                );

                expect(value).toBe('$$4.00 per day');
                expect(selection).toEqual([3, 3]);
            });

            it('|$$43.00 per day| => deleteForward => $$| per day', () => {
                const {value, selection} = process(
                    '$$43.00 per day',
                    [0, '$$43.00 per day'.length],
                    'deleteForward',
                );

                expect(value).toBe('$$ per day');
                expect(selection).toEqual([2, 2]);
            });

            it('|$$43.00 per day| => deleteBackward => $$| per day', () => {
                const {value, selection} = process(
                    '$$43.00 per day',
                    [0, '$$43.00 per day'.length],
                    'deleteBackward',
                );

                expect(value).toBe('$$ per day');
                expect(selection).toEqual([2, 2]);
            });

            it('$$4|123|3.21 per day => deleteBackward => $$4|3.21 per day', () => {
                const {value, selection} = process(
                    '$$41233.21 per day',
                    [3, 6],
                    'deleteBackward',
                );

                expect(value).toBe('$$43.21 per day');
                expect(selection).toEqual([3, 3]);
            });

            it('$$4|123|3.21 per day => deleteForward => $$4|3.21 per day', () => {
                const {value, selection} = process(
                    '$$41233.21 per day',
                    [3, 6],
                    'deleteForward',
                );

                expect(value).toBe('$$43.21 per day');
                expect(selection).toEqual([3, 3]);
            });

            it('$$-0|.00 per day => deleteBackward => $$-| per day', () => {
                const {value, selection} = process(
                    '$$-0.00 per day',
                    [3, 4],
                    'deleteBackward',
                );

                expect(value).toBe('$$- per day');
                expect(selection).toEqual([3, 3]);
            });

            it('$$-0|.00 per day => deleteForward => $$-| per day', () => {
                const {value, selection} = process(
                    '$$-0.00 per day',
                    [3, 4],
                    'deleteForward',
                );

                expect(value).toBe('$$- per day');
                expect(selection).toEqual([3, 3]);
            });
        });

        describe('precision = 4', () => {
            const processor = createClearInputPreprocessor({
                decimalSeparator: '.',
                decimalZeroPadding: true,
                minusSign: '-',
                prefix: '$$',
                postfix: ' per day',
                precision: 4,
            });

            const process = (
                value: string,
                selection: SelectionRange,
                type: 'deleteBackward' | 'deleteForward',
            ): ElementState =>
                processor({elementState: {value, selection}, data: ''}, type)
                    .elementState;

            it('$$41233.2|12|3 per day => deleteForward => $$41233.2|300 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [9, 11],
                    'deleteForward',
                );

                expect(value).toBe('$$41233.2300 per day');
                expect(selection).toEqual([9, 9]);
            });

            it('$$41233.2|12|3 per day => deleteBackward => $$41233.2|300 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [9, 11],
                    'deleteBackward',
                );

                expect(value).toBe('$$41233.2300 per day');
                expect(selection).toEqual([9, 9]);
            });

            it('$$4123|3.2|123 per day => deleteBackward => $$4123|.1230 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [6, 9],
                    'deleteBackward',
                );

                expect(value).toBe('$$4123.1230 per day');
                expect(selection).toEqual([6, 6]);
            });

            it('$$4123|3.2|123 per day => deleteForward => $$4123|.1230 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [6, 9],
                    'deleteForward',
                );

                expect(value).toBe('$$4123.1230 per day');
                expect(selection).toEqual([6, 6]);
            });

            it('$$41|233|.2123 per day => deleteForward => $$41|.2123 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [4, 7],
                    'deleteForward',
                );

                expect(value).toBe('$$41.2123 per day');
                expect(selection).toEqual([4, 4]);
            });

            it('$$41|233|.2123 per day => deleteBackward => $$41|.2123 per day', () => {
                const {value, selection} = process(
                    '$$41233.2123 per day',
                    [4, 7],
                    'deleteBackward',
                );

                expect(value).toBe('$$41.2123 per day');
                expect(selection).toEqual([4, 4]);
            });
        });
    });

    describe('simple tests', () => {
        describe('precision 2', () => {
            const processor = createClearInputPreprocessor({
                decimalSeparator: '.',
                decimalZeroPadding: true,
                minusSign: '-',
                prefix: '',
                postfix: '',
                precision: 2,
            });

            const process = (
                value: string,
                selection: SelectionRange,
                type: 'deleteBackward' | 'deleteForward',
            ): ElementState =>
                processor({elementState: {value, selection}, data: ''}, type)
                    .elementState;

            it('4|3.0|0 => deleteBackward => 4|.00', () => {
                const {value, selection} = process('43.00', [1, 4], 'deleteBackward');

                expect(value).toBe('4.00');
                expect(selection).toEqual([1, 1]);
            });

            it('4|3.0|0 => deleteForward => 4|.00', () => {
                const {value, selection} = process('43.00', [1, 4], 'deleteForward');

                expect(value).toBe('4.00');
                expect(selection).toEqual([1, 1]);
            });

            it('|43.00| => deleteForward => |', () => {
                const {value, selection} = process('43.00', [0, 4], 'deleteForward');

                expect(value).toBe('');
                expect(selection).toEqual([0, 0]);
            });

            it('|43.00| => deleteBackward => |', () => {
                const {value, selection} = process('43.00', [0, 4], 'deleteBackward');

                expect(value).toBe('');
                expect(selection).toEqual([0, 0]);
            });

            it('4|123|3.21 => deleteBackward => 4|3.21', () => {
                const {value, selection} = process('41233.21', [1, 4], 'deleteBackward');

                expect(value).toBe('43.21');
                expect(selection).toEqual([1, 1]);
            });

            it('4|123|3.21 => deleteForward => 4|3.21', () => {
                const {value, selection} = process('41233.21', [1, 4], 'deleteForward');

                expect(value).toBe('43.21');
                expect(selection).toEqual([1, 1]);
            });

            it('-0|.00 => deleteBackward => -|', () => {
                const {value, selection} = process('-0.00', [1, 2], 'deleteBackward');

                expect(value).toBe('-');
                expect(selection).toEqual([1, 1]);
            });

            it('-0|.00 => deleteForward => -|', () => {
                const {value, selection} = process('-0.00', [1, 2], 'deleteForward');

                expect(value).toBe('-');
                expect(selection).toEqual([1, 1]);
            });
        });

        describe('precision 4', () => {
            const processor = createClearInputPreprocessor({
                decimalSeparator: '.',
                decimalZeroPadding: true,
                minusSign: '-',
                prefix: '',
                postfix: '',
                precision: 4,
            });

            const process = (
                value: string,
                selection: SelectionRange,
                type: 'deleteBackward' | 'deleteForward',
            ): ElementState =>
                processor({elementState: {value, selection}, data: ''}, type)
                    .elementState;

            it('41233.2|12|3 => deleteForward => 41233.2|300', () => {
                const {value, selection} = process('41233.2123', [7, 9], 'deleteForward');

                expect(value).toBe('41233.2300');
                expect(selection).toEqual([7, 7]);
            });

            it('41233.2|12|3 => deleteBackward => 41233.2|300', () => {
                const {value, selection} = process(
                    '41233.2123',
                    [7, 9],
                    'deleteBackward',
                );

                expect(value).toBe('41233.2300');
                expect(selection).toEqual([7, 7]);
            });

            it('4123|3.2|123 => deleteBackward => 4123|.1230', () => {
                const {value, selection} = process(
                    '41233.2123',
                    [4, 7],
                    'deleteBackward',
                );

                expect(value).toBe('4123.1230');
                expect(selection).toEqual([4, 4]);
            });

            it('4123|3.2|123 => deleteForward => 4123|.1230', () => {
                const {value, selection} = process('41233.2123', [4, 7], 'deleteForward');

                expect(value).toBe('4123.1230');
                expect(selection).toEqual([4, 4]);
            });

            it('41|233|.2123 => deleteForward => 41|.2123', () => {
                const {value, selection} = process('41233.2123', [2, 5], 'deleteForward');

                expect(value).toBe('41.2123');
                expect(selection).toEqual([2, 2]);
            });

            it('41|233|.2123 => deleteBackward => 41|.2123', () => {
                const {value, selection} = process(
                    '41233.2123',
                    [2, 5],
                    'deleteBackward',
                );

                expect(value).toBe('41.2123');
                expect(selection).toEqual([2, 2]);
            });
        });
    });
});
