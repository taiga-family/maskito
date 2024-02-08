import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';
import {maskitoDateTimeOptionsGenerator} from '@maskito/kit';

import {DATE_TIME_SEPARATOR} from '../constants';

describe('DateTime (maskitoTransform) | Pseudo date end separators', () => {
    let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

    beforeEach(() => {
        options = maskitoDateTimeOptionsGenerator({
            dateMode: 'dd/mm/yyyy',
            timeMode: 'HH:MM:SS.MSS',
            dateSeparator: '.',
        });
    });

    it('works with already valid range separator', () => {
        expect(maskitoTransform(`01012000${DATE_TIME_SEPARATOR}235959999`, options)).toBe(
            `01.01.2000${DATE_TIME_SEPARATOR}23:59:59.999`,
        );
    });

    it('replaces space with valid date end separator', () => {
        expect(maskitoTransform('01012000 ', options)).toBe(
            `01.01.2000${DATE_TIME_SEPARATOR}`,
        );
        expect(maskitoTransform('01012000 2359', options)).toBe(
            `01.01.2000${DATE_TIME_SEPARATOR}23:59`,
        );
    });

    it('replaces comma with valid range separator', () => {
        expect(maskitoTransform('01012000,', options)).toBe(
            `01.01.2000${DATE_TIME_SEPARATOR}`,
        );
        expect(maskitoTransform('01012000,235959999', options)).toBe(
            `01.01.2000${DATE_TIME_SEPARATOR}23:59:59.999`,
        );
    });

    it('does not add anything if separator does not initially exist', () => {
        expect(maskitoTransform('01012000', options)).toBe('01.01.2000');
    });
});
