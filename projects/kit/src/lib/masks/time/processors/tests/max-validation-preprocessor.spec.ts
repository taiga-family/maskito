import {describe, expect, it} from '@jest/globals';

import {DEFAULT_TIME_SEGMENT_MAX_VALUES} from '../../../../constants';
import {createMaxValidationPreprocessor} from '../max-validation-preprocessor';

describe('createMaxValidationPreprocessor', () => {
    const processor = createMaxValidationPreprocessor(
        DEFAULT_TIME_SEGMENT_MAX_VALUES,
        'HH:MM:SS',
    );

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
                'insert',
            ).data || '';

        it('all time segments valid', () => {
            expect(process('17:43:00')).toBe('17:43:00');
        });

        it('contains invalid time segment for hours', () => {
            expect(process('30:30:30')).toBe('');
        });

        it('invalid time segment for minutes', () => {
            expect(process('23:70:30')).toBe('');
        });
    });

    describe('Dropping text inside with a pointer / browser autofill', () => {
        const process = (value: string): string =>
            processor(
                {
                    elementState: {
                        value,
                        selection: [0, value.length],
                    },
                    data: '',
                },
                'validation',
            ).elementState.value;

        it('all time segments valid', () => {
            expect(process('17:43:00')).toBe('17:43:00');
        });

        it('contains invalid time segment for hours', () => {
            expect(process('30:30:30')).toBe('');
        });

        it('invalid time segment for minutes', () => {
            expect(process('23:70:30')).toBe('');
        });
    });
});
