import {describe, expect, it} from '@jest/globals';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../constants/default-min-max-dates';
import {createMinMaxDatePostprocessor} from '../min-max-date-postprocessor';

describe('createMinMaxDatePostprocessor', () => {
    const createPostprocessor = (
        rangeSeparator = '',
    ): ReturnType<typeof createMinMaxDatePostprocessor> =>
        createMinMaxDatePostprocessor({
            dateModeTemplate: 'yyyy/mm/dd',
            min: DEFAULT_MIN_DATE,
            max: DEFAULT_MAX_DATE,
            dateSeparator: '/',
            rangeSeparator,
        });

    const check = (
        initial: string,
        next: string,
        expected: string,
        rangeSeparator = '',
    ): void => {
        const {value} = createPostprocessor(rangeSeparator)(
            {value: next, selection: [next.length, next.length]},
            {value: initial, selection: [initial.length, initial.length]},
        );

        expect(value).toBe(expected);
    };

    describe('clamps day to the last day of the new month when it is changed by typing', () => {
        it('2026/01/31 => type "2" => 2026/02/28', () => {
            check('2026/01/31', '2026/02/31', '2026/02/28');
        });

        it('2024/01/31 => type "4" => 2024/04/30', () => {
            check('2024/01/31', '2024/04/31', '2024/04/30');
        });

        it('2024/02/29 => type "4" => 2024/04/29 (nothing to clamp)', () => {
            check('2024/02/29', '2024/04/29', '2024/04/29');
        });

        it('2026/01/31 – 2026/01/20 => type "2" in the first date => 2026/02/28 – 2026/01/20', () => {
            check(
                '2026/01/31 – 2026/01/20',
                '2026/02/31 – 2026/01/20',
                '2026/02/28 – 2026/01/20',
                ' – ',
            );
        });
    });

    describe('keeps native Date normalization when month is not changed', () => {
        it('2026/02/28 => type "1" => 2026/03/03 (day is changed, month is not)', () => {
            check('2026/02/28', '2026/02/31', '2026/03/03');
        });

        it('2024/02/29 => year change => 2025/03/01', () => {
            check('2024/02/29', '2025/02/29', '2025/03/01');
        });
    });

    describe('keeps the day as is when the new month contains it', () => {
        it('2026/01/15 => type "4" => 2026/04/15', () => {
            check('2026/01/15', '2026/04/15', '2026/04/15');
        });
    });

    describe('typing a month from scratch keeps the native Date normalization', () => {
        // https://github.com/taiga-family/maskito/issues/2936
        // The month counts as "changed" only if its previous value was a
        // complete valid month (01–12), not a partially typed one.
        it('dd/mm: 31.0 => type "4" => 01.05 (like e2e "dd/mm => 01.05")', () => {
            checkDDmm('31.0', '31.04', '01.05');
        });

        it('yyyy/mm/dd: 2026/01/31 => type "0" => 2026/01/31 (new month 00 is raised to min)', () => {
            check('2026/01/31', '2026/00/31', '2026/01/31');
        });
    });

    describe('dd/mm: yearless dates use the leap-year basis, same as the conversion path', () => {
        it('dd/mm: 29.01 => type "2" => 29.02 (leap February keeps the day)', () => {
            checkDDmm('29.01', '29.02', '29.02');
        });

        it('dd/mm: 30.01 => type "2" => 29.02 (clamped to the leap February)', () => {
            checkDDmm('30.01', '30.02', '29.02');
        });
    });

    function checkDDmm(initial: string, next: string, expected: string): void {
        const {value} = createMinMaxDatePostprocessor({
            dateModeTemplate: 'dd.mm',
            min: DEFAULT_MIN_DATE,
            max: DEFAULT_MAX_DATE,
            dateSeparator: '.',
        })(
            {value: next, selection: [next.length, next.length]},
            {
                value: initial,
                selection: [initial.length, initial.length],
            },
        );

        expect(value).toBe(expected);
    }
});
