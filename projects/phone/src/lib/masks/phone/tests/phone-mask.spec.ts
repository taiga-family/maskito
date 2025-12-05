import {beforeEach, describe, expect, it} from '@jest/globals';
import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';
import {MaskModel} from '@maskito/core/src/lib/classes';
import metadata from 'libphonenumber-js/min/metadata';

import {maskitoPhoneOptionsGenerator} from '../phone-mask';

describe('Phone (maskitoTransform)', () => {
    describe('KZ number - initial value handling', () => {
        it('maskModel deleteCharacters works with initial value', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'KZ',
                metadata,
            });

            // Simulate: User has "+7 771 931-1111" and presses backspace at end
            const initialValue = '+7 771 931-1111';
            const selectionFrom = 14; // position before last "1"
            const selectionTo = 15; // position after last "1"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+7 771 931-1111');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - should have one less digit
            expect(maskModel.value).toBe('+7 771 931-111');
        });

        it('maskModel deleteCharacters from middle (deleting "9")', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'KZ',
                metadata,
            });

            // Simulate: User has "+7 771 931-1111" with cursor at position 7-8 (selecting "9")
            const initialValue = '+7 771 931-1111';
            const selectionFrom = 7; // position of "9"
            const selectionTo = 8; // position after "9"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+7 771 931-1111');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - "9" should be removed, digits shift
            expect(maskModel.value).toBe('+7 771 311-111');
        });
    });

    describe('US number - initial value handling', () => {
        it('maskModel deleteCharacters works with initial value', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
            });

            // Simulate: User has "+1 212 343-3355" and presses backspace at end
            const initialValue = '+1 212 343-3355';
            const selectionFrom = 14; // position before last "5"
            const selectionTo = 15; // position after last "5"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+1 212 343-3355');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - should have one less digit
            expect(maskModel.value).toBe('+1 212 343-335');
        });

        it('maskModel deleteCharacters from middle (deleting "3")', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'US',
                metadata,
            });

            // Simulate: User has "+1 212 343-3355" with cursor at position 7-8 (selecting first "3" in "343")
            const initialValue = '+1 212 343-3355';
            const selectionFrom = 7; // position of "3"
            const selectionTo = 8; // position after "3"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+1 212 343-3355');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - "3" should be removed, digits shift
            expect(maskModel.value).toBe('+1 212 433-355');
        });
    });

    describe('FR number - initial value handling', () => {
        it('maskModel deleteCharacters works with initial value', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'FR',
                metadata,
            });

            // Simulate: User has "+33 6 12-34-56-78" and presses backspace at end
            const initialValue = '+33 6 12-34-56-78';
            const selectionFrom = 16; // position before last "8"
            const selectionTo = 17; // position after last "8"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+33 6 12-34-56-78');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - should have one less digit
            expect(maskModel.value).toBe('+33 6 12-34-56-7');
        });

        it('maskModel deleteCharacters from middle (deleting "3")', () => {
            const options = maskitoPhoneOptionsGenerator({
                countryIsoCode: 'FR',
                metadata,
            });

            // Simulate: User has "+33 6 12-34-56-78" with cursor at position 9-10 (selecting "3" in "34")
            const initialValue = '+33 6 12-34-56-78';
            const selectionFrom = 9; // position of "3"
            const selectionTo = 10; // position after "3"

            const maskModel = new MaskModel(
                {value: initialValue, selection: [selectionFrom, selectionTo]},
                {...MASKITO_DEFAULT_OPTIONS, ...options},
            );

            // Before delete
            expect(maskModel.value).toBe('+33 6 12-34-56-78');

            // Execute delete
            maskModel.deleteCharacters();

            // After delete - "3" should be removed, digits shift
            expect(maskModel.value).toBe('+33 6 12-45-67-8');
        });
    });

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
