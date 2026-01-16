import {describe, expect, it} from '@jest/globals';
import {AsYouType} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

import {getPhoneTemplate} from '../utils/get-phone-template';

describe('getPhoneTemplate', () => {
    describe('International format', () => {
        it('generates template for value with "+" prefix', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '+12125552365',
                separator: '-',
            });

            // Template uses 'x' for all digit positions (including country code)
            expect(template).toBe('xx xxx xxx-xxxx');
        });

        it('generates same template for value without "+" prefix (pasted number)', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '12125552365',
                separator: '-',
            });

            // Should produce the same template as with '+' prefix
            expect(template).toBe('xx xxx xxx-xxxx');
        });

        it('returns empty template for empty value', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '',
                separator: '-',
            });

            expect(template).toBe('');
        });

        it('returns single "x" for value with only "+"', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '+',
                separator: '-',
            });

            expect(template).toBe('x');
        });

        it('handles formatted value with spaces', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '+1 212 555 2365',
                separator: '-',
            });

            expect(template).toBe('xx xxx xxx-xxxx');
        });

        it('handles value with only formatting characters (no digits)', () => {
            const formatter = new AsYouType(undefined, metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '( ) -',
                separator: '-',
            });

            expect(template).toBe('');
        });

        describe('pasting numbers without "+" prefix produces correct template', () => {
            it('using US number: 12125552365', () => {
                const formatter = new AsYouType(undefined, metadata);
                const templateWithPlus = getPhoneTemplate({
                    formatter,
                    value: '+12125552365',
                    separator: '-',
                });

                formatter.reset();

                const templateWithoutPlus = getPhoneTemplate({
                    formatter,
                    value: '12125552365',
                    separator: '-',
                });

                // Both should produce the same template
                expect(templateWithoutPlus).toBe(templateWithPlus);
                expect(templateWithoutPlus).toBe('xx xxx xxx-xxxx');
            });

            it('using RU number: 79202800155', () => {
                const formatter = new AsYouType(undefined, metadata);
                const templateWithPlus = getPhoneTemplate({
                    formatter,
                    value: '+79202800155',
                    separator: '-',
                });

                formatter.reset();

                const templateWithoutPlus = getPhoneTemplate({
                    formatter,
                    value: '79202800155',
                    separator: '-',
                });

                // Both should produce the same template
                expect(templateWithoutPlus).toBe(templateWithPlus);
                expect(templateWithoutPlus).toBe('xx xxx xxx-xx-xx');
            });

            it('using BY number: 375447488269', () => {
                const formatter = new AsYouType(undefined, metadata);
                const templateWithPlus = getPhoneTemplate({
                    formatter,
                    value: '+375447488269',
                    separator: '-',
                });

                formatter.reset();

                const templateWithoutPlus = getPhoneTemplate({
                    formatter,
                    value: '375447488269',
                    separator: '-',
                });

                // Both should produce the same template
                expect(templateWithoutPlus).toBe(templateWithPlus);
                expect(templateWithoutPlus).toBe('xxxx xx xxx-xx-xx');
            });
        });

        describe('custom separator', () => {
            it('uses space as separator', () => {
                const formatter = new AsYouType(undefined, metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '+12125552365',
                    separator: ' ',
                });

                expect(template).toBe('xx xxx xxx xxxx');
            });

            it('uses dot as separator', () => {
                const formatter = new AsYouType(undefined, metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '+12125552365',
                    separator: '.',
                });

                expect(template).toBe('xx xxx xxx.xxxx');
            });
        });
    });

    describe('National format', () => {
        it('generates US national template', () => {
            const formatter = new AsYouType('US', metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '2125552365',
                separator: '-',
                countryIsoCode: 'US',
                metadata,
                format: 'NATIONAL',
            });

            expect(template).toBe('(xxx) xxx-xxxx');
        });

        it('generates RU national template', () => {
            const formatter = new AsYouType('RU', metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '9202800155',
                separator: '-',
                countryIsoCode: 'RU',
                metadata,
                format: 'NATIONAL',
            });

            expect(template).toBe('xxx xxx-xx-xx');
        });

        it('returns empty template for empty value', () => {
            const formatter = new AsYouType('US', metadata);
            const template = getPhoneTemplate({
                formatter,
                value: '',
                separator: '-',
                countryIsoCode: 'US',
                metadata,
                format: 'NATIONAL',
            });

            expect(template).toBe('');
        });

        describe('incomplete US numbers with leading country code', () => {
            it('1212555 => x (xxx) xxx (no hyphen after parenthesis)', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '1212555',
                    separator: '-',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                // Should NOT produce 'x (xxx)-xxx' - space after ) must be preserved
                expect(template).toBe('x (xxx) xxx');
            });

            it('12125553 => x (xxx) xxx-x (hyphen only before last group)', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '12125553',
                    separator: '-',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                expect(template).toBe('x (xxx) xxx-x');
            });

            it('1212 => x (xxx) (incomplete area code)', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '1212',
                    separator: '-',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                expect(template).toBe('x (xxx)');
            });

            it('12125 => x (xxx) x', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '12125',
                    separator: '-',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                expect(template).toBe('x (xxx) x');
            });
        });

        describe('incomplete US numbers with custom separator', () => {
            it('1212555 with space separator => x (xxx) xxx', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '1212555',
                    separator: ' ',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                expect(template).toBe('x (xxx) xxx');
            });

            it('12125553 with space separator => x (xxx) xxx x', () => {
                const formatter = new AsYouType('US', metadata);
                const template = getPhoneTemplate({
                    formatter,
                    value: '12125553',
                    separator: ' ',
                    countryIsoCode: 'US',
                    metadata,
                    format: 'NATIONAL',
                });

                expect(template).toBe('x (xxx) xxx x');
            });
        });
    });
});
