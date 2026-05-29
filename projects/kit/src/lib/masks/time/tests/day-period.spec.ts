import {describe, expect, it} from '@jest/globals';
import {maskitoTransform} from '@maskito/core';
import {maskitoTime} from '@maskito/kit';

import {CHAR_NO_BREAK_SPACE} from '../../../constants';

describe('maskitoTime with `dayPeriod`', () => {
    describe("['AM', 'PM']", () => {
        const options = maskitoTime({
            mode: 'HH:MM',
            dayPeriod: ['AM', 'PM'],
        });

        it("renders 'AM' for morning", () => {
            expect(maskitoTransform('0930A', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}AM`,
            );
        });

        it("renders 'PM' for evening", () => {
            expect(maskitoTransform('0530P', options)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}PM`,
            );
        });

        it('preserves backward compatibility with deprecated AA mode', () => {
            const legacyOptions = maskitoTime({mode: 'HH:MM AA'});

            expect(maskitoTransform('0530P', legacyOptions)).toBe(
                `05:30${CHAR_NO_BREAK_SPACE}PM`,
            );
        });
    });

    describe("['am', 'pm'] (hi-IN style)", () => {
        const options = maskitoTime({
            mode: 'HH:MM',
            dayPeriod: ['am', 'pm'],
        });

        it('normalizes uppercase input to lowercase markers', () => {
            expect(maskitoTransform('0930A', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}am`,
            );
        });
    });

    describe("['ص', 'م'] Arabic", () => {
        const options = maskitoTime({
            mode: 'HH:MM',
            dayPeriod: ['ص', 'م'],
        });

        it("renders 'ص' marker", () => {
            expect(maskitoTransform('0930ص', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}ص`,
            );
        });

        it("renders 'م' marker", () => {
            expect(maskitoTransform('0930م', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}م`,
            );
        });
    });

    describe("['上午', '下午'] Chinese", () => {
        const options = maskitoTime({
            mode: 'HH:MM',
            dayPeriod: ['上午', '下午'],
        });

        it("renders multi-char '上午' marker", () => {
            expect(maskitoTransform('0930上午', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}上午`,
            );
        });

        it("renders multi-char '下午' marker", () => {
            expect(maskitoTransform('0930下午', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}下午`,
            );
        });

        it('partially entered value', () => {
            expect(maskitoTransform('0930上', options)).toBe(
                `09:30${CHAR_NO_BREAK_SPACE}上午`,
            );
        });
    });

    describe("['', ''] keeps 24-hour mode", () => {
        const options = maskitoTime({
            mode: 'HH:MM',
            dayPeriod: ['', ''],
        });

        it('does not append meridiem', () => {
            expect(maskitoTransform('1430', options)).toBe('14:30');
        });
    });
});
