import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE} from '../../constants';
import {
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
} from '../../processors';
import {MaskitoDateMode, MaskitoDateSegments} from '../../types';
import {createMinMaxRangeLengthPostprocessor} from './processors/min-max-range-length-postprocessor';
import {createSwapDatesPostprocessor} from './processors/swap-dates-postprocessor';

export function maskitoDateRangeOptionsGenerator({
    mode,
    separator = '.',
    min,
    max,
    minLength,
    maxLength,
    rangeSeparator = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`,
}: {
    mode: MaskitoDateMode;
    separator?: string;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
    rangeSeparator?: string;
}): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(separator);
    const dateMask = Array.from(dateModeTemplate).map(char =>
        char === separator ? char : /\d/,
    );

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateMask, ...Array.from(rangeSeparator), ...dateMask],
        overwriteMode: 'replace',
        preprocessors: [
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: separator,
                datesSeparator: rangeSeparator,
            }),
        ],
        postprocessors: [
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                datesSeparator: rangeSeparator,
                dateSegmentSeparator: separator,
            }),
            createMinMaxRangeLengthPostprocessor({
                dateModeTemplate,
                minLength,
                maxLength,
                max,
                datesSeparator: rangeSeparator,
            }),
            createSwapDatesPostprocessor({
                dateModeTemplate,
                datesSeparator: rangeSeparator,
            }),
        ],
    };
}
