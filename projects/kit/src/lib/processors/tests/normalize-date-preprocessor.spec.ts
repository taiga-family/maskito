import {MaskitoPreprocessor} from '@maskito/core';

import {normalizeDatePreprocessor} from '../normalize-date-preprocessor';

describe('normalizeDatePreprocessor', () => {
    describe('Input-date-range', () => {
        const preprocessor = normalizeDatePreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            dateSegmentsSeparator: '.',
            rangeSeparator: ' – ',
        });

        const check = getCheckFunction(preprocessor);

        it('Empty input => 6.2.2023 – 7.2.2023', () => {
            check('6.2.2023 – 7.2.2023', '06.02.2023 – 07.02.2023');
        });

        it('Empty input => 6.2.2023 – 7.2.2023 (basic spaces)', () => {
            check('6.2.2023 – 7.2.2023', '06.02.2023 – 07.02.2023');
        });

        it('Empty input => 06.2.2023-07.2.2023', () => {
            check('06.2.2023-07.2.2023', '06.02.2023 – 07.02.2023');
        });
    });

    describe('Input-date long mode', () => {
        const preprocessor = normalizeDatePreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            dateSegmentsSeparator: '.',
        });

        const check = getCheckFunction(preprocessor);

        it('Empty input => 6.2.2023', () => {
            check('6.2.2023', '06.02.2023');
        });

        it('Empty input => 06.2.2023', () => {
            check('06.2.2023', '06.02.2023');
        });

        it('Empty input => 06.2.20', () => {
            check('06.2.20', '06.02.20');
        });
    });

    describe('input-date short mode', () => {
        const preprocessor = normalizeDatePreprocessor({
            dateModeTemplate: 'mm/yy',
            dateSegmentsSeparator: '/',
        });

        const check = getCheckFunction(preprocessor);

        it('Empty input => 2/2/22', () => {
            check('2/2', '02/2');
        });

        it('Empty input => 1.1', () => {
            check('1.1', '01/1');
        });

        it('Empty input => 3.12', () => {
            check('3.12', '03/12');
        });
    });

    describe('input-date-time', () => {
        const preprocessor = normalizeDatePreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            dateSegmentsSeparator: '.',
        });
        const check = getCheckFunction(preprocessor);

        it('Empty input => 6.2.2023, 12:00', () => {
            check('6.2.2023, 12:00', '06.02.2023, 12:00');
        });

        it('Empty input => 6.2.2023, 15', () => {
            check('6.2.2023, 15', '06.02.2023, 15');
        });

        it('Empty input => 06.2.2023', () => {
            check('06.2.2023', '06.02.2023');
        });

        it('Empty input => 6.2.2023', () => {
            check('6.2.2022, 15', '06.02.2022, 15');
        });
    });
});

function getCheckFunction(
    preprocessor: MaskitoPreprocessor,
): (actual: string, expected: string) => void {
    return (insertedCharacters: string, expectedValue: string): void => {
        const EMPTY_INPUT = {value: '', selection: [0, 0] as [number, number]};

        const {data} = preprocessor(
            {elementState: EMPTY_INPUT, data: insertedCharacters},
            'insert',
        );

        expect(data).toEqual(expectedValue);
    };
}
