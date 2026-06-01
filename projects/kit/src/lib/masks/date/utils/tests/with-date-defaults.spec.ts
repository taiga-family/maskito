import {describe, expect, it} from '@jest/globals';

import {DEFAULT_MAX_DATE, DEFAULT_MIN_DATE} from '../../../../constants';
import {withDateDefaults} from '../with-date-defaults';

describe('withDateDefaults', () => {
    describe('defaults (no locale)', () => {
        it('fills mode, separator, min & max when only mode is provided', () => {
            expect(withDateDefaults({mode: 'mm/dd/yyyy'})).toEqual({
                locale: '',
                mode: 'mm/dd/yyyy',
                separator: '.',
                min: DEFAULT_MIN_DATE,
                max: DEFAULT_MAX_DATE,
            });
        });

        it('defaults separator to dot', () => {
            expect(withDateDefaults({mode: 'dd/mm/yyyy'}).separator).toBe('.');
        });
    });

    describe('explicit params take precedence', () => {
        it('keeps the provided separator', () => {
            expect(withDateDefaults({mode: 'dd/mm/yyyy', separator: '-'}).separator).toBe(
                '-',
            );
        });

        it('keeps the provided min & max', () => {
            const min = new Date(2000, 0, 1);
            const max = new Date(2030, 11, 31);

            expect(withDateDefaults({mode: 'dd/mm/yyyy', min, max})).toMatchObject({
                min,
                max,
            });
        });

        it('explicit mode overrides locale mode', () => {
            expect(withDateDefaults({locale: 'en-US', mode: 'yyyy/mm/dd'}).mode).toBe(
                'yyyy/mm/dd',
            );
        });

        it('explicit separator overrides locale separator', () => {
            expect(withDateDefaults({locale: 'en-US', separator: '#'}).separator).toBe(
                '#',
            );
        });
    });

    describe('locale-derived params', () => {
        it('en-US: mm/dd/yyyy with slash', () => {
            expect(withDateDefaults({locale: 'en-US'})).toMatchObject({
                locale: 'en-US',
                mode: 'mm/dd/yyyy',
                separator: '/',
            });
        });

        it('en-GB: dd/mm/yyyy', () => {
            expect(withDateDefaults({locale: 'en-GB'}).mode).toBe('dd/mm/yyyy');
        });

        it('ja-JP: yyyy/mm/dd with slash', () => {
            expect(withDateDefaults({locale: 'ja-JP'})).toMatchObject({
                mode: 'yyyy/mm/dd',
                separator: '/',
            });
        });

        it('lt-LT: yyyy/mm/dd with hyphen', () => {
            expect(withDateDefaults({locale: 'lt-LT'})).toMatchObject({
                mode: 'yyyy/mm/dd',
                separator: '-',
            });
        });

        it('preserves the locale in the result', () => {
            expect(withDateDefaults({locale: 'de-DE'}).locale).toBe('de-DE');
        });
    });

    describe('result shape', () => {
        it('returns all required keys', () => {
            expect(Object.keys(withDateDefaults({mode: 'dd/mm/yyyy'})).sort()).toEqual([
                'locale',
                'max',
                'min',
                'mode',
                'separator',
            ]);
        });
    });
});
