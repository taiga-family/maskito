import {describe, expect, it} from '@jest/globals';

import {createValidDatePreprocessor} from '../valid-date-preprocessor';

describe('createValidDatePreprocessor', () => {
    describe('Paste/Drop of many characters', () => {
        const preprocessor = createValidDatePreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            dateSegmentsSeparator: '.',
            rangeSeparator: ' – ',
        });
        const EMPTY_INPUT = {value: '', selection: [0, 0] as [number, number]};

        const check = (insertedCharacters: string, expectedValue: string): void => {
            const {data} = preprocessor(
                {elementState: EMPTY_INPUT, data: insertedCharacters},
                'insert',
            );

            expect(data).toEqual(expectedValue);
        };

        it('empty input => 06.02.2023 – 07.02.2023 (non-breaking spaces)', () => {
            check('06.02.2023 – 07.02.2023', '06.02.2023 – 07.02.2023');
        });

        it('empty input => 06.02.2023 – 07.02.2023 (basic spaces)', () => {
            check('06.02.2023 – 07.02.2023', '06.02.202307.02.2023');
        });

        it('empty input => 06.02.2023–07.02.2023', () => {
            check('06.02.2023–07.02.2023', '06.02.202307.02.2023');
        });

        it('empty input => 06.02.202307.02.2023', () => {
            check('06.02.202307.02.2023', '06.02.202307.02.2023');
        });

        it('empty input => 0602202307022023', () => {
            check('0602202307022023', '06.02.202307.02.2023');
        });
    });

    it('ignores range separator', () => {
        const rangeSeparator = ' – ';
        const processor = createValidDatePreprocessor({
            rangeSeparator,
            dateModeTemplate: 'dd.mm.yyyy',
            dateSegmentsSeparator: '.',
        });

        const initialState = {
            value: '06.02.2023',
            selection: ['06.02.2023'.length, '06.02.2023'.length] as const,
        };
        const {elementState, data} = processor(
            {elementState: initialState, data: rangeSeparator},
            'insert',
        );

        expect(elementState).toEqual(initialState);
        expect(data).toBe(rangeSeparator);
    });
});
