import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../../../constants';
import {createMaxValidationPreprocessor} from '../max-validation-preprocessor';

describe('createMaxValidationPreprocessor', () => {
    const processor = createMaxValidationPreprocessor(DEFAULT_TIME_SEGMENT_MAX_VALUES);

    describe('Paste from clipboard', () => {
        const process = (data: string): string =>
            processor(
                {
                    elementState: {
                        value: '',
                        selection: [0, 0],
                    },
                    data,
                },
                {
                    eventName: 'beforeinput',
                    inputType: 'insertFromPaste',
                },
            ).data || '';

        it('All time segments valid', () => {
            expect(process('17:43:00')).toBe('17:43:00');
        });

        it('contains invalid time segment for hours', () => {
            expect(process('30:30:30')).toBe('');
        });

        it('Invalid time segment for minutes', () => {
            expect(process('23:70:30')).toBe('');
        });
    });

    describe('Browser autofill', () => {
        const process = (value: string): string =>
            processor(
                {
                    elementState: {
                        value,
                        selection: [0, value.length],
                    },
                    data: '',
                },
                {eventName: 'input', inputType: 'insertText'},
            ).elementState.value;

        it('All time segments valid', () => {
            expect(process('17:43:00')).toBe('17:43:00');
        });

        it('contains invalid time segment for hours', () => {
            expect(process('30:30:30')).toBe('');
        });

        it('Invalid time segment for minutes', () => {
            expect(process('23:70:30')).toBe('');
        });
    });
});
