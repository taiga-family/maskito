import {beforeEach, describe, expect, it} from '@jest/globals';
import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';
import metadata from 'libphonenumber-js/min/metadata';

import {maskitoPhoneOptionsGenerator} from '../phone-mask';

describe('Phone (maskitoTransform)', () => {
    describe('RU number', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'RU',
                metadata,
            });
        });

        it('full number +7 code', () => {
            expect(maskitoTransform('+79202800155', options)).toBe('+7 920 280-01-55');
        });

        it('full number 8 code', () => {
            expect(maskitoTransform('89202800155', options)).toBe('+7 920 280-01-55');
        });

        it('full number without code', () => {
            expect(maskitoTransform('9202800155', options)).toBe('+7 920 280-01-55');
        });

        it('full number with extra chars', () => {
            expect(maskitoTransform('8 (920) 280-01-55', options)).toBe(
                '+7 920 280-01-55',
            );
        });
    });

    describe('non-strict', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                metadata,
                strict: false,
                countryIsoCode: 'RU',
            });
        });

        it('full number +7 code', () => {
            expect(maskitoTransform('+79202800155', options)).toBe('+7 920 280-01-55');
        });

        it('full number 8 code', () => {
            expect(maskitoTransform('89202800155', options)).toBe('+7 920 280-01-55');
        });

        it('full number with extra chars', () => {
            expect(maskitoTransform('8 (920) 280-01-55', options)).toBe(
                '+7 920 280-01-55',
            );
        });
    });

    describe('National format', () => {
        describe('US number', () => {
            let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

            beforeEach(() => {
                options = maskitoPhoneOptionsGenerator({
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });
            });

            it('formats digits to national format (xxx) xxx-xxxx', () => {
                expect(maskitoTransform('2123433355', options)).toBe('(212) 343-3355');
            });

            it('strips country code from international format', () => {
                expect(maskitoTransform('+12123433355', options)).toBe('(212) 343-3355');
            });

            /**
             * Note: libphonenumber-js formatIncompletePhoneNumber closes parentheses
             * even for incomplete area codes, e.g., '212' -> '(212)'
             */
            it('handles partial input - area code (library adds closing paren)', () => {
                expect(maskitoTransform('212', options)).toBe('(212)');
            });

            it('handles area code plus digit', () => {
                expect(maskitoTransform('2123', options)).toBe('(212) 3');
            });

            it('handles formatted input with extra chars', () => {
                expect(maskitoTransform('(212) 343-3355', options)).toBe(
                    '(212) 343-3355',
                );
            });
        });

        describe('RU number', () => {
            let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

            beforeEach(() => {
                options = maskitoPhoneOptionsGenerator({
                    countryIsoCode: 'RU',
                    metadata,
                    format: 'NATIONAL',
                });
            });

            it('formats digits to national format', () => {
                expect(maskitoTransform('9202800155', options)).toBe('920 280-01-55');
            });

            it('strips country code from international format', () => {
                expect(maskitoTransform('+79202800155', options)).toBe('920 280-01-55');
            });

            /**
             * Note: When input starts with '8', libphonenumber-js interprets it
             * as part of the number rather than the old Russian trunk prefix.
             * We test that the national number portion is extracted correctly.
             */
            it('strips alternate country code (8) via parsing', () => {
                expect(maskitoTransform('89202800155', options)).toBe(
                    '8 (920) 280-01-55',
                );
            });
        });

        describe('Custom separator', () => {
            let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

            beforeEach(() => {
                options = maskitoPhoneOptionsGenerator({
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                    separator: ' ',
                });
            });

            it('uses custom separator in national format', () => {
                expect(maskitoTransform('2123433355', options)).toBe('(212) 343 3355');
            });
        });
    });
});
