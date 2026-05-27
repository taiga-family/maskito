import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoTime} from '@maskito/kit';

import {CHAR_NO_BREAK_SPACE} from '../../../constants';

describe('`maskitoTime` with `locale` property', () => {
    describe('infers dayPeriod from locale', () => {
        it('en-US appends AM/PM marker', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'en-US'});

            expect(maskitoTransform('0930A', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}AM`,
            );
            expect(maskitoTransform('0530P', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}PM`,
            );
        });

        it('hi-IN appends lowercase am/pm marker', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'hi-IN'});

            expect(maskitoTransform('0930A', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}am`,
            );
        });

        it('ar-EG appends Arabic marker', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'ar-EG'});

            expect(maskitoTransform('0930ص', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}ص`,
            );
        });

        it('zh-TW appends Chinese marker', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'zh-TW'});

            expect(maskitoTransform('0930上午', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}上午`,
            );
        });

        it('el-GR appends Greek π.μ./μ.μ. markers with dots', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'el-GR'});

            expect(maskitoTransform('0930π', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}π.μ.`,
            );
            expect(maskitoTransform('0530μ', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}μ.μ.`,
            );
        });

        it('am-ET appends Amharic ጥዋት/ከሰዓት markers', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'am-ET'});

            expect(maskitoTransform('0930ጥ', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}ጥዋት`,
            );
            expect(maskitoTransform('0530ከ', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}ከሰዓት`,
            );
        });

        it('dz-BT appends Tibetan/Dzongkha markers', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'dz-BT'});

            expect(maskitoTransform('0930ས', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}སྔ་ཆ་`,
            );
            expect(maskitoTransform('0530ཕ', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}ཕྱི་ཆ་`,
            );
        });

        it('en-GB (24-hour locale) does not append meridiem', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'en-GB'});

            expect(maskitoTransform('1430', options)).toBe('14:30');
        });

        it('de-DE (24-hour locale) does not append meridiem', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'de-DE'});

            expect(maskitoTransform('1430', options)).toBe('14:30');
        });

        it('fr-FR (24-hour locale) does not append meridiem', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'fr-FR'});

            expect(maskitoTransform('2315', options)).toBe('23:15');
        });

        it('ja-JP (24-hour locale) does not append meridiem', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'ja-JP'});

            expect(maskitoTransform('2315', options)).toBe('23:15');
        });
    });

    describe('infers separators from locale', () => {
        it('de-DE uses comma before milliseconds', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'de-DE'});

            expect(maskitoTransform('143050789', options)).toBe('14:30:50,789');
        });

        it('ru-RU uses comma before milliseconds', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'ru-RU'});

            expect(maskitoTransform('143050789', options)).toBe('14:30:50,789');
        });

        it('da-DK uses dots between hours/minutes/seconds and comma before milliseconds', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'da-DK'});

            expect(maskitoTransform('143050789', options)).toBe('14.30.50,789');
        });

        it('en-US keeps canonical colons and dot, and appends AM/PM', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'en-US'});

            expect(maskitoTransform('093050789A', options)).toBe(
                `09:30:50.789${CHAR_NO_BREAK_SPACE}AM`,
            );
        });

        it('fi-FI uses dots and comma before milliseconds', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'fi-FI'});

            expect(maskitoTransform('143050789', options)).toBe('14.30.50,789');
        });

        it('fr-CA uses multi-character separators " h ", " min ", ","', () => {
            const options = maskitoTime({mode: 'HH:MM:SS.MSS', locale: 'fr-CA'});

            expect(maskitoTransform('143050789', options)).toBe('14 h 30 min 50,789');
        });

        it('fr-CA HH:MM:SS uses first two multi-char separators only', () => {
            const options = maskitoTime({mode: 'HH:MM:SS', locale: 'fr-CA'});

            expect(maskitoTransform('143050', options)).toBe('14 h 30 min 50');
        });

        it('de-DE HH:MM is unaffected by locale (no fractional separator needed)', () => {
            const options = maskitoTime({mode: 'HH:MM', locale: 'de-DE'});

            expect(maskitoTransform('1430', options)).toBe('14:30');
        });
    });

    describe('explicit dayPeriod overrides locale dayPeriod', () => {
        it('en-US locale with explicit empty dayPeriod stays 24-hour', () => {
            const options = maskitoTime({
                mode: 'HH:MM',
                locale: 'en-US',
                dayPeriod: ['', ''],
            });

            expect(maskitoTransform('1430', options)).toBe('14:30');
        });

        it('en-GB locale with explicit AM/PM uses explicit value', () => {
            const options = maskitoTime({
                mode: 'HH:MM',
                locale: 'en-GB',
                dayPeriod: ['AM', 'PM'],
            });

            expect(maskitoTransform('0530P', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}PM`,
            );
        });
    });

    describe('explicit separators override locale separators', () => {
        it('de-DE locale with explicit dot separators ignores locale comma', () => {
            const options = maskitoTime({
                mode: 'HH:MM:SS.MSS',
                locale: 'de-DE',
                separators: ['.', '.', '.'],
            });

            expect(maskitoTransform('143050789', options)).toBe('14.30.50.789');
        });
    });
});
