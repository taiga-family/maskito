import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoTimeOptionsGenerator} from '@maskito/kit';

describe('maskitoTimeOptionsGenerator with custom separators', () => {
    it('dot separator formats HH:MM as HH.MM', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: ['.'],
        });

        expect(maskitoTransform('1430', options)).toBe('14.30');
    });

    it('slash separator formats HH:MM as HH/MM', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: ['/'],
        });

        expect(maskitoTransform('0930', options)).toBe('09/30');
    });

    it('h separator formats HH:MM as HHhMM', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: ['h'],
        });

        expect(maskitoTransform('1430', options)).toBe('14h30');
    });

    it('multi-char " h " separator formats HH:MM as "HH h MM"', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: [' h '],
        });

        expect(maskitoTransform('1430', options)).toBe('14 h 30');
    });

    it('fr-CA style: " h " and " min " for HH:MM:SS', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS',
            separators: [' h ', ' min '],
        });

        expect(maskitoTransform('143045', options)).toBe('14 h 30 min 45');
    });

    it('fr-CA style with fractional seconds: " h ", " min ", "," for HH:MM:SS.MSS', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS.MSS',
            separators: [' h ', ' min ', ','],
        });

        expect(maskitoTransform('180505766', options)).toBe('18 h 05 min 05,766');
    });

    it('dot separator with HH:MM:SS (both positions)', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS',
            separators: ['.', '.'],
        });

        expect(maskitoTransform('143045', options)).toBe('14.30.45');
    });

    it('mixed separators per position for HH:MM:SS', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS',
            separators: ['.', ':'],
        });

        expect(maskitoTransform('143045', options)).toBe('14.30:45');
    });

    it('default colon separator is unchanged', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: [':'],
        });

        expect(maskitoTransform('1430', options)).toBe('14:30');
    });

    it('empty separator array uses canonical separators from mode', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS.MSS',
            separators: [],
        });

        expect(maskitoTransform('143045678', options)).toBe('14:30:45.678');
    });

    it('comma as last separator for HH:MM:SS.MSS', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS.MSS',
            separators: [':', ':', ','],
        });

        expect(maskitoTransform('14304567', options)).toBe('14:30:45,67');
    });

    it('dot separator with comma for milliseconds', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS.MSS',
            separators: ['.', '.', ','],
        });

        expect(maskitoTransform('14304567', options)).toBe('14.30.45,67');
    });

    it('short array repeats last separator for remaining positions', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM:SS',
            separators: ['.'],
        });

        expect(maskitoTransform('143045', options)).toBe('14.30.45');
    });

    it('per-position separators for MM:SS.MSS', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'MM:SS.MSS',
            separators: [':', ','],
        });

        expect(maskitoTransform('3045678', options)).toBe('30:45,678');
    });

    it('dot separator for MM:SS mode', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'MM:SS',
            separators: ['.'],
        });

        expect(maskitoTransform('3045', options)).toBe('30.45');
    });

    it('comma separator for SS.MSS mode', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'SS.MSS',
            separators: [','],
        });

        expect(maskitoTransform('45678', options)).toBe('45,678');
    });

    it('dot and comma for MM:SS.MSS mode', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'MM:SS.MSS',
            separators: ['.', ','],
        });

        expect(maskitoTransform('3045678', options)).toBe('30.45,678');
    });

    it('empty string separator removes visual separator for HH:MM', () => {
        const options = maskitoTimeOptionsGenerator({
            mode: 'HH:MM',
            separators: [''],
        });

        expect(maskitoTransform('1430', options)).toBe('1430');
    });
});
