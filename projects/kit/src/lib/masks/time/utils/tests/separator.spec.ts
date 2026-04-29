import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoStringifyTime, maskitoTimeOptionsGenerator} from '@maskito/kit';

import {resolveSeparators} from '../../../../utils/time';

describe('Time mask with custom separator', () => {
    describe('resolveSeparators', () => {
        describe('default separators from mode', () => {
            it('returns [":"] for mode "HH:MM"', () => {
                expect(resolveSeparators('HH:MM')).toEqual([':']);
            });

            it('returns [":", ":"] for mode "HH:MM:SS"', () => {
                expect(resolveSeparators('HH:MM:SS')).toEqual([':', ':']);
            });

            it('returns [":", ":", "."] for mode "HH:MM:SS.MSS"', () => {
                expect(resolveSeparators('HH:MM:SS.MSS')).toEqual([':', ':', '.']);
            });

            it('ignores AA suffix for mode "HH:MM:SS.MSS AA"', () => {
                expect(resolveSeparators('HH:MM:SS.MSS AA')).toEqual([':', ':', '.']);
            });

            it('ignores AA suffix for mode "HH:MM AA"', () => {
                expect(resolveSeparators('HH:MM AA')).toEqual([':']);
            });

            it('returns [":"] for mode "MM:SS"', () => {
                expect(resolveSeparators('MM:SS')).toEqual([':']);
            });

            it('returns [":", "."] for mode "MM:SS.MSS"', () => {
                expect(resolveSeparators('MM:SS.MSS')).toEqual([':', '.']);
            });

            it('returns ["."] for mode "SS.MSS"', () => {
                expect(resolveSeparators('SS.MSS')).toEqual(['.']);
            });

            it('returns [] for mode "HH" (no separator positions)', () => {
                expect(resolveSeparators('HH')).toEqual([]);
            });
        });

        describe('user-provided separators', () => {
            it('overrides all positions', () => {
                expect(resolveSeparators('HH:MM:SS.MSS', [':', ':', ','])).toEqual([
                    ':',
                    ':',
                    ',',
                ]);
            });

            it('short array pads remaining positions with canonical defaults', () => {
                expect(resolveSeparators('HH:MM:SS', ['.'])).toEqual(['.', ':']);
            });

            it('empty array returns all canonical defaults', () => {
                expect(resolveSeparators('HH:MM:SS.MSS', [])).toEqual([':', ':', '.']);
            });

            it('multi-char fr-CA style separator', () => {
                expect(resolveSeparators('HH:MM:SS', [' h ', ' min '])).toEqual([
                    ' h ',
                    ' min ',
                ]);
            });

            it('fr-CA with fractional seconds: " h ", " min ", "," for "HH:MM:SS.MSS"', () => {
                expect(resolveSeparators('HH:MM:SS.MSS', [' h ', ' min ', ','])).toEqual([
                    ' h ',
                    ' min ',
                    ',',
                ]);
            });

            it('extra elements beyond separator positions are ignored', () => {
                expect(resolveSeparators('HH:MM', ['h', 'extra', 'ignored'])).toEqual([
                    'h',
                ]);
            });
        });
    });

    describe('maskitoTimeOptionsGenerator', () => {
        it('dot separator formats HH:MM as HH.MM', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: ['.'],
            });
            const result = maskitoTransform('1430', options);

            expect(result).toBe('14.30');
        });

        it('slash separator formats HH:MM as HH/MM', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: ['/'],
            });
            const result = maskitoTransform('0930', options);

            expect(result).toBe('09/30');
        });

        it('h separator formats HH:MM as HHhMM', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: ['h'],
            });
            const result = maskitoTransform('1430', options);

            expect(result).toBe('14h30');
        });

        it('multi-char " h " separator formats HH:MM as "HH h MM"', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: [' h '],
            });
            const result = maskitoTransform('1430', options);

            expect(result).toBe('14 h 30');
        });

        it('fr-CA style: " h " and " min " for HH:MM:SS', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS',
                separators: [' h ', ' min '],
            });
            const result = maskitoTransform('143045', options);

            expect(result).toBe('14 h 30 min 45');
        });

        it('fr-CA style with fractional seconds: " h ", " min ", "," for HH:MM:SS.MSS', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS.MSS',
                separators: [' h ', ' min ', ','],
            });
            const result = maskitoTransform('180505766', options);

            expect(result).toBe('18 h 05 min 05,766');
        });

        it('dot separator with HH:MM:SS (both positions)', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS',
                separators: ['.', '.'],
            });
            const result = maskitoTransform('143045', options);

            expect(result).toBe('14.30.45');
        });

        it('mixed separators per position for HH:MM:SS', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS',
                separators: ['.', ':'],
            });
            const result = maskitoTransform('143045', options);

            expect(result).toBe('14.30:45');
        });

        it('default colon separator is unchanged', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: [':'],
            });
            const result = maskitoTransform('1430', options);

            expect(result).toBe('14:30');
        });

        it('empty separator array uses canonical separators from mode', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS.MSS',
                separators: [],
            });
            const result = maskitoTransform('143045678', options);

            expect(result).toBe('14:30:45.678');
        });

        it('comma as last separator for HH:MM:SS.MSS', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS.MSS',
                separators: [':', ':', ','],
            });
            const result = maskitoTransform('14304567', options);

            expect(result).toBe('14:30:45,67');
        });

        it('dot separator with comma for milliseconds', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS.MSS',
                separators: ['.', '.', ','],
            });
            const result = maskitoTransform('14304567', options);

            expect(result).toBe('14.30.45,67');
        });

        it('short array is padded with canonical defaults', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM:SS',
                separators: ['.'],
            });
            const result = maskitoTransform('143045', options);

            expect(result).toBe('14.30:45');
        });

        it('per-position separators for MM:SS.MSS', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'MM:SS.MSS',
                separators: [':', ','],
            });
            const result = maskitoTransform('3045678', options);

            expect(result).toBe('30:45,678');
        });

        it('dot separator for MM:SS mode', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'MM:SS',
                separators: ['.'],
            });
            const result = maskitoTransform('3045', options);

            expect(result).toBe('30.45');
        });

        it('comma separator for SS.MSS mode', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'SS.MSS',
                separators: [','],
            });
            const result = maskitoTransform('45678', options);

            expect(result).toBe('45,678');
        });

        it('dot and comma for MM:SS.MSS mode', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'MM:SS.MSS',
                separators: ['.', ','],
            });
            const result = maskitoTransform('3045678', options);

            expect(result).toBe('30.45,678');
        });

        it('empty string separator removes visual separator for HH:MM', () => {
            const options = maskitoTimeOptionsGenerator({
                mode: 'HH:MM',
                separators: [''],
            });
            const result = maskitoTransform('1430', options);

            expect(result).toBe('1430');
        });
    });

    describe('maskitoStringifyTime', () => {
        it('uses dot separator from params', () => {
            const params = {mode: 'HH:MM' as const, separators: ['.']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000,
                params,
            );

            expect(result).toBe('14.30');
        });

        it('preserves colon separator by default', () => {
            const params = {mode: 'HH:MM' as const};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000,
                params,
            );

            expect(result).toBe('14:30');
        });

        it('uses dot separator with HH:MM:SS mode (both positions)', () => {
            const params = {mode: 'HH:MM:SS' as const, separators: ['.', '.']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000,
                params,
            );

            expect(result).toBe('14.30.45');
        });

        it('uses h separator', () => {
            const params = {mode: 'HH:MM' as const, separators: ['h']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000,
                params,
            );

            expect(result).toBe('14h30');
        });

        it('fr-CA style: " h " and " min " separators for HH:MM:SS', () => {
            const params = {mode: 'HH:MM:SS' as const, separators: [' h ', ' min ']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000,
                params,
            );

            expect(result).toBe('14 h 30 min 45');
        });

        it('fr-CA style with fractional seconds: " h ", " min ", "," for HH:MM:SS.MSS', () => {
            const result = maskitoStringifyTime(
                18 * 60 * 60 * 1000 + 5 * 60 * 1000 + 5 * 1000 + 766,
                {mode: 'HH:MM:SS.MSS' as const, separators: [' h ', ' min ', ',']},
            );

            expect(result).toBe('18 h 05 min 05,766');
        });

        it('uses comma for milliseconds', () => {
            const params = {mode: 'HH:MM:SS.MSS' as const, separators: [':', ':', ',']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000 + 678,
                params,
            );

            expect(result).toBe('14:30:45,678');
        });

        it('uses dot separator and comma for milliseconds together', () => {
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000 + 678,
                {
                    mode: 'HH:MM:SS.MSS' as const,
                    separators: ['.', '.', ','],
                },
            );

            expect(result).toBe('14.30.45,678');
        });

        it('short array pads with canonical defaults', () => {
            const params = {mode: 'HH:MM:SS' as const, separators: ['.']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000,
                params,
            );

            expect(result).toBe('14.30:45');
        });

        it('dot separator for MM:SS mode', () => {
            const params = {mode: 'MM:SS' as const, separators: ['.']};
            const result = maskitoStringifyTime(30 * 60 * 1000 + 45 * 1000, params);

            expect(result).toBe('30.45');
        });

        it('comma separator for SS.MSS mode', () => {
            const params = {mode: 'SS.MSS' as const, separators: [',']};
            const result = maskitoStringifyTime(45 * 1000 + 678, params);

            expect(result).toBe('45,678');
        });

        it('dot and comma for MM:SS.MSS mode', () => {
            const params = {mode: 'MM:SS.MSS' as const, separators: ['.', ',']};
            const result = maskitoStringifyTime(30 * 60 * 1000 + 45 * 1000 + 678, params);

            expect(result).toBe('30.45,678');
        });

        it('hH mode with no separators', () => {
            const params = {mode: 'HH' as const};
            const result = maskitoStringifyTime(14 * 60 * 60 * 1000, params);

            expect(result).toBe('14');
        });

        it('empty string separator produces concatenated digits for HH:MM', () => {
            const params = {mode: 'HH:MM' as const, separators: ['']};
            const result = maskitoStringifyTime(
                14 * 60 * 60 * 1000 + 30 * 60 * 1000,
                params,
            );

            expect(result).toBe('1430');
        });
    });
});
