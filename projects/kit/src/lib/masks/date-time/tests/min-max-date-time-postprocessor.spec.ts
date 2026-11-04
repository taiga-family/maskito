import {describe, expect, it} from '@jest/globals';

import {
    DEFAULT_MAX_DATE,
    DEFAULT_MIN_DATE,
} from '../../../constants/default-min-max-dates';
import {createMinMaxDateTimePostprocessor} from '../postprocessors/min-max-date-time-postprocessor';

describe('createMinMaxDateTimePostprocessor', () => {
    const createPostprocessor = (): ReturnType<
        typeof createMinMaxDateTimePostprocessor
    > =>
        createMinMaxDateTimePostprocessor({
            dateModeTemplate: 'yyyy/mm/dd',
            mode: 'HH:MM',
            separators: [':'],
            min: DEFAULT_MIN_DATE,
            max: DEFAULT_MAX_DATE,
            dateTimeSeparator: ', ',
        });

    const check = (initial: string, next: string, expected: string): void => {
        const {value} = createPostprocessor()(
            {value: next, selection: [next.length, next.length]},
            {value: initial, selection: [initial.length, initial.length]},
        );

        expect(value).toBe(expected);
    };

    describe('clamps day to the last day of the new month when it is changed by typing', () => {
        it('2026/01/31, 12:00 => type "2" in month => 2026/02/28, 12:00', () => {
            check('2026/01/31, 12:00', '2026/02/31, 12:00', '2026/02/28, 12:00');
        });

        it('2026/01/31, 12:00 => type "4" in month => 2026/04/30, 12:00', () => {
            check('2026/01/31, 12:00', '2026/04/31, 12:00', '2026/04/30, 12:00');
        });

        it('2024/02/29, 23:59 => type "4" in month => 2024/04/29, 23:59 (nothing to clamp)', () => {
            check('2024/02/29, 23:59', '2024/04/29, 23:59', '2024/04/29, 23:59');
        });
    });

    describe('keeps native Date normalization when month is not changed', () => {
        it('2026/02/28, 12:00 => day changed to 31 => 2026/03/03, 12:00', () => {
            check('2026/02/28, 12:00', '2026/02/31, 12:00', '2026/03/03, 12:00');
        });
    });
});
