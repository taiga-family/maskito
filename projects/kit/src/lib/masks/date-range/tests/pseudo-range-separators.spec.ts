import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';
import {maskitoDateRangeOptionsGenerator} from '@maskito/kit';

import {CHAR_EM_DASH, CHAR_EN_DASH, CHAR_HYPHEN, CHAR_MINUS} from '../../../constants';

describe('DateRange (maskitoTransform) | Pseudo range separators', () => {
    let options: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

    beforeEach(() => {
        options = maskitoDateRangeOptionsGenerator({
            mode: 'dd/mm/yyyy',
            dateSeparator: '.',
            rangeSeparator: CHAR_EN_DASH,
        });
    });

    it('works with already valid range separator', () => {
        expect(maskitoTransform(`01012000${CHAR_EN_DASH}10102000`, options)).toBe(
            `01.01.2000${CHAR_EN_DASH}10.10.2000`,
        );
    });

    it('replaces hyphen with valid range separator', () => {
        expect(maskitoTransform(`01012000${CHAR_HYPHEN}10102000`, options)).toBe(
            `01.01.2000${CHAR_EN_DASH}10.10.2000`,
        );
    });

    it('replaces em-dash with valid range separator', () => {
        expect(maskitoTransform(`01012000${CHAR_EM_DASH}10102000`, options)).toBe(
            `01.01.2000${CHAR_EN_DASH}10.10.2000`,
        );
    });

    it('replaces minus with valid range separator', () => {
        expect(maskitoTransform(`01012000${CHAR_MINUS}10102000`, options)).toBe(
            `01.01.2000${CHAR_EN_DASH}10.10.2000`,
        );
    });
});
