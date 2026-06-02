import {beforeEach, describe, expect, it} from '@jest/globals';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';

import {maskitoDateTime} from '../date-time-mask';
import {maskitoParseDateTime, maskitoStringifyDateTime} from '../utils';

describe('DateTime | locale', () => {
    let options = MASKITO_DEFAULT_OPTIONS;

    describe('derives date order, separator & 24-hour time from locale', () => {
        const testCases = [
            // locale | typed digits | formatted value
            ['de-DE', '050220040341', '05.02.2004, 03:41'],
            ['en-GB', '050220040341', '05/02/2004, 03:41'],
            ['lt-LT', '202405021830', '2024-05-02, 18:30'],
            ['ja-JP', '202405021830', '2024/05/02, 18:30'],
        ] as const;

        testCases.forEach(([locale, typedDigits, formattedValue]) => {
            describe(locale, () => {
                beforeEach(() => {
                    options = maskitoDateTime({locale});
                });

                it(`${typedDigits} => ${formattedValue}`, () => {
                    expect(maskitoTransform(typedDigits, options)).toBe(formattedValue);
                });
            });
        });
    });

    describe('derives 12-hour meridiem time from locale (en-US)', () => {
        beforeEach(() => {
            options = maskitoDateTime({locale: 'en-US'});
        });

        it('mm/dd/yyyy order with slash separator', () => {
            expect(maskitoTransform('05102025', options)).toBe('05/10/2025');
        });

        it('switches to 12-hour format and appends a typed meridiem', () => {
            // meridiem is prefixed with a non-breaking space (U+00A0)
            expect(maskitoTransform('051020250630p', options)).toBe(
                '05/10/2025, 06:30 PM',
            );
        });
    });

    describe('explicit params override locale', () => {
        it('explicit dateMode overrides locale order (en-US => dd/mm/yyyy)', () => {
            options = maskitoDateTime({locale: 'en-US', dateMode: 'dd/mm/yyyy'});

            expect(maskitoTransform('10052025', options)).toBe('10/05/2025');
        });

        it('explicit dateSeparator overrides locale separator', () => {
            options = maskitoDateTime({locale: 'de-DE', dateSeparator: '/'});

            expect(maskitoTransform('05022004', options)).toBe('05/02/2004');
        });

        it('explicit timeMode keeps requested precision', () => {
            options = maskitoDateTime({locale: 'lt-LT', timeMode: 'HH:MM:SS'});

            expect(maskitoTransform('20240502183055', options)).toBe(
                '2024-05-02, 18:30:55',
            );
        });
    });

    describe('parse & stringify respect the locale day-period (12-hour format)', () => {
        // en-US prefixes the meridiem with a non-breaking space (U+00A0)
        const enUsValue = '05/10/2025, 06:30 PM';

        it('maskitoParseDateTime reads the meridiem (PM => 18:30)', () => {
            const parsed = maskitoParseDateTime(enUsValue, {locale: 'en-US'});

            expect(parsed).toEqual(new Date(2025, 4, 10, 18, 30));
        });

        it('maskitoStringifyDateTime emits the locale meridiem', () => {
            expect(
                maskitoStringifyDateTime(new Date(2025, 4, 10, 18, 30), {
                    locale: 'en-US',
                }),
            ).toBe(enUsValue);
        });

        it('round-trips through stringify <=> parse', () => {
            const date = new Date(2025, 4, 10, 18, 30);

            expect(
                maskitoParseDateTime(maskitoStringifyDateTime(date, {locale: 'en-US'}), {
                    locale: 'en-US',
                }),
            ).toEqual(date);
        });
    });
});
