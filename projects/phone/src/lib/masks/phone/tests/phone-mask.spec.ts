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

    describe('US number with NATIONAL format', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                format: 'NATIONAL',
            });
        });

        it('formats to national format', () => {
            expect(maskitoTransform('2133734253', options)).toBe('(213) 373-4253');
        });

        it('strips country code and formats nationally', () => {
            expect(maskitoTransform('+12133734253', options)).toBe('(213) 373-4253');
        });

        it('handles number with formatting', () => {
            expect(maskitoTransform('213-373-4253', options)).toBe('(213) 373-4253');
        });

        it('handles partial number with three digits', () => {
            expect(maskitoTransform('213', options)).toBe('(213)');
        });

        it('handles partial number with four digits', () => {
            expect(maskitoTransform('2134', options)).toBe('(213) 4');
        });

        it('handles partial number with seven digits', () => {
            expect(maskitoTransform('2134567', options)).toBe('(213) 456-7');
        });
    });

    describe('US number with INTERNATIONAL format (default)', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
            });
        });

        it('formats to international format', () => {
            expect(maskitoTransform('2133734253', options)).toBe('+1 213 373-4253');
        });

        it('formats with explicit INTERNATIONAL format', () => {
            const explicitOptions = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
                format: 'INTERNATIONAL',
            });

            expect(maskitoTransform('2133734253', explicitOptions)).toBe(
                '+1 213 373-4253',
            );
        });
    });

    describe('RU number with NATIONAL format', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'RU',
                metadata,
                format: 'NATIONAL',
            });
        });

        it('formats to national format', () => {
            expect(maskitoTransform('9202800155', options)).toBe('8 (920) 280-01-55');
        });

        it('strips country code and formats nationally', () => {
            expect(maskitoTransform('+79202800155', options)).toBe('8 (920) 280-01-55');
        });

        it.each([
            ['920', '920'],
            ['9202', '920 2'],
            ['9202800', '920 280-0'],
        ])('formats partial input %s', (input, expected) => {
            expect(maskitoTransform(input, options)).toBe(expected);
        });
    });

    describe('DE number with NATIONAL format', () => {
        let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

        beforeEach(() => {
            options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'DE',
                metadata,
                format: 'NATIONAL',
            });
        });

        it('formats to national format', () => {
            expect(maskitoTransform('30123456', options)).toBe('030 123456');
        });
    });
});
