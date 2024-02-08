import {POSSIBLE_DATE_RANGE_SEPARATOR} from '../../masks/date-range/constants';
import {POSSIBLE_DATE_TIME_SEPARATOR} from '../../masks/date-time/constants';
import {createFirstDateEndSeparatorPreprocessor} from '../first-date-end-separator-preprocessor';

describe('FirstDateEndSeparatorPreprocessor', () => {
    const EMPTY_SELECTION = [0, 0] as const;

    describe('DateRange', () => {
        const preprocessorFn = createFirstDateEndSeparatorPreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            firstDateEndSeparator: ' ~ ',
            dateSegmentSeparator: '.',
            pseudoFirstDateEndSeparators: POSSIBLE_DATE_RANGE_SEPARATOR,
        });
        const preprocess = (value: string): string =>
            preprocessorFn(
                {elementState: {value, selection: EMPTY_SELECTION}, data: ''},
                'validation',
            ).elementState.value;

        it('Only complete date (without date end separator)', () => {
            expect(preprocess('01.01.2000')).toBe('01.01.2000');
        });

        it('Only complete date + date end separator', () => {
            expect(preprocess('01.01.2000~')).toBe('01.01.2000 ~ ');
        });

        it('01.01.2000_11.11.2011', () => {
            expect(preprocess('01.01.2000_11.11.2011')).toBe('01.01.2000 ~ 11.11.2011');
        });

        it('01.01.2000-11.11.2011', () => {
            expect(preprocess('01.01.2000-11.11.2011')).toBe('01.01.2000 ~ 11.11.2011');
        });

        it('01-01-2000 - 11-11-2011', () => {
            expect(preprocess('01-01-2000 - 11-11-2011')).toBe('01-01-2000 ~ 11-11-2011');
        });

        it('01.01.2000~11.11.2011', () => {
            expect(preprocess('01.01.2000~11.11.2011')).toBe('01.01.2000 ~ 11.11.2011');
        });

        it('01.01.2000 ~ 11.11.2011', () => {
            expect(preprocess('01.01.2000 ~ 11.11.2011')).toBe('01.01.2000 ~ 11.11.2011');
        });

        it('`value` contains only complete date and `data` contains pseudo range separator', () => {
            const {elementState, data} = preprocessorFn(
                {
                    elementState: {value: '01.01.2000', selection: EMPTY_SELECTION},
                    data: '-',
                },
                'insert',
            );

            expect(elementState.value).toBe('01.01.2000');
            expect(data).toBe(' ~ ');
        });
    });

    describe('DateTime', () => {
        const preprocessorFn = createFirstDateEndSeparatorPreprocessor({
            dateModeTemplate: 'dd.mm.yyyy',
            firstDateEndSeparator: '_',
            dateSegmentSeparator: '.',
            pseudoFirstDateEndSeparators: POSSIBLE_DATE_TIME_SEPARATOR,
        });
        // eslint-disable-next-line sonarjs/no-identical-functions
        const preprocess = (value: string): string =>
            preprocessorFn(
                {elementState: {value, selection: EMPTY_SELECTION}, data: ''},
                'validation',
            ).elementState.value;

        it('01.01.2000,23:59', () => {
            expect(preprocess('01.01.2000,23:59')).toBe('01.01.2000_23:59');
        });

        it('01.01.2000, 23:59', () => {
            expect(preprocess('01.01.2000, 23:59')).toBe('01.01.2000_23:59');
        });

        it('01.01.2000_23:59', () => {
            expect(preprocess('01.01.2000_23:59')).toBe('01.01.2000_23:59');
        });

        it('01-01-2000-23:59', () => {
            expect(preprocess('01-01-2000-23:59')).toBe('01-01-2000_23:59');
        });
    });
});
