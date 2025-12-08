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
});
