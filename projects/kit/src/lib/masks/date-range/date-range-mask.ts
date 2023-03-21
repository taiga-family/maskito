import {MaskitoOptions, maskitoPipe} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../constants';
import {
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {MaskitoDateMode, MaskitoDateSegments} from '../../types';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
import {createSwapDatesPostprocessor} from './processors/swap-dates-postprocessor';

const DATE_RANGE_SEPARATOR = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

export function maskitoDateRangeOptionsGenerator({
    mode,
    separator = '.',
    min,
    max,
    minLength,
    maxLength,
}: {
    mode: MaskitoDateMode;
    separator?: string;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
}): MaskitoOptions {
    const dateModeTemplate = mode.split('/').join(separator);
    const dateMask = Array.from(dateModeTemplate).map(char =>
        char === separator ? char : /\d/,
    );

    return {
        mask: [...dateMask, ...DATE_RANGE_SEPARATOR, ...dateMask],
        overwriteMode: 'replace',
        preprocessor: maskitoPipe(
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
                datesSeparator: DATE_RANGE_SEPARATOR,
            }),
        ),
        postprocessor: maskitoPipe(
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                datesSeparator: DATE_RANGE_SEPARATOR,
                dateSegmentSeparator: separator,
            }),
            createMinMaxRangeLengthPostprocessor({
                dateModeTemplate,
                minLength,
                maxLength,
                max,
                datesSeparator: DATE_RANGE_SEPARATOR,
            }),
            createSwapDatesPostprocessor({
                dateModeTemplate,
                datesSeparator: DATE_RANGE_SEPARATOR,
            }),
        ),
    };
}
