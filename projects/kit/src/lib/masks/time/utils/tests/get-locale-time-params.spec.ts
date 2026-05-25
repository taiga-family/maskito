import {describe, expect, it} from '@jest/globals';

import {getLocaleTimeParams} from '../get-locale-time-params';

describe('getLocaleTimeParams', () => {
    describe('dayPeriod', () => {
        it('en-US: [AM, PM]', () => {
            expect(getLocaleTimeParams('en-US').dayPeriod).toEqual(['AM', 'PM']);
        });

        it('hi-IN: [am, pm] (lowercase)', () => {
            expect(getLocaleTimeParams('hi-IN').dayPeriod).toEqual(['am', 'pm']);
        });

        it('ko-KR: [AM, PM] (meridiem leading)', () => {
            expect(getLocaleTimeParams('ko-KR').dayPeriod).toEqual(['AM', 'PM']);
        });

        it('ar-EG: Arabic letters', () => {
            expect(getLocaleTimeParams('ar-EG').dayPeriod).toEqual(['ص', 'م']);
        });

        it('zh-TW: Chinese characters (上午/下午)', () => {
            expect(getLocaleTimeParams('zh-TW').dayPeriod).toEqual(['上午', '下午']);
        });

        it('el-GR: Greek abbreviations with dots (π.μ./μ.μ.)', () => {
            expect(getLocaleTimeParams('el-GR').dayPeriod).toEqual(['π.μ.', 'μ.μ.']);
        });

        it('am-ET: Amharic/Ethiopic words', () => {
            expect(getLocaleTimeParams('am-ET').dayPeriod).toEqual(['ጥዋት', 'ከሰዓት']);
        });

        it('ms-MY: Malay abbreviations (PG/PTG, not AM/PM)', () => {
            expect(getLocaleTimeParams('ms-MY').dayPeriod).toEqual(['PG', 'PTG']);
        });

        it('dz-BT: Tibetan script (Dzongkha)', () => {
            expect(getLocaleTimeParams('dz-BT').dayPeriod).toEqual(['སྔ་ཆ་', 'ཕྱི་ཆ་']);
        });

        it('en-GB: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('en-GB').dayPeriod).toEqual(['', '']);
        });

        it('de-DE: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('de-DE').dayPeriod).toEqual(['', '']);
        });

        it('fr-FR: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('fr-FR').dayPeriod).toEqual(['', '']);
        });

        it('ru-RU: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('ru-RU').dayPeriod).toEqual(['', '']);
        });

        it('ja-JP: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('ja-JP').dayPeriod).toEqual(['', '']);
        });

        it('fr-CA: empty pair (24-hour locale)', () => {
            expect(getLocaleTimeParams('fr-CA').dayPeriod).toEqual(['', '']);
        });
    });

    describe('separators', () => {
        it('en-US: colons and dot before milliseconds', () => {
            expect(getLocaleTimeParams('en-US').separators).toEqual([':', ':', '.']);
        });

        it('en-GB: colons and dot before milliseconds', () => {
            expect(getLocaleTimeParams('en-GB').separators).toEqual([':', ':', '.']);
        });

        it('de-DE: colons and comma before milliseconds (locale decimal)', () => {
            expect(getLocaleTimeParams('de-DE').separators).toEqual([':', ':', ',']);
        });

        it('ru-RU: colons and comma before milliseconds', () => {
            expect(getLocaleTimeParams('ru-RU').separators).toEqual([':', ':', ',']);
        });

        it('da-DK: dots and comma before milliseconds', () => {
            expect(getLocaleTimeParams('da-DK').separators).toEqual(['.', '.', ',']);
        });

        it('fi-FI: dots and comma before milliseconds', () => {
            expect(getLocaleTimeParams('fi-FI').separators).toEqual(['.', '.', ',']);
        });

        it('fr-CA: multi-character separators with comma', () => {
            expect(getLocaleTimeParams('fr-CA').separators).toEqual([
                ' h ',
                ' min ',
                ',',
            ]);
        });

        it('ko-KR: ignores leading dayPeriod literal', () => {
            expect(getLocaleTimeParams('ko-KR').separators).toEqual([':', ':', '.']);
        });

        it('ar-EG: ignores trailing dayPeriod literal', () => {
            expect(getLocaleTimeParams('ar-EG').separators).toEqual([':', ':', '٫']);
        });
    });
});
