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
    dateSeparator = separator,
    rangeSeparator = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`,
}: {
    mode: MaskitoDateMode;
    /**
     * @deprecated use `dateSeparator` instead
     * TODO: drop in v2.0
     */
    separator?: string;
    min?: Date;
    max?: Date;
    minLength?: Partial<MaskitoDateSegments<number>>;
    maxLength?: Partial<MaskitoDateSegments<number>>;
    dateSeparator?: string;
    rangeSeparator?: string;
}): Required<MaskitoOptions> {
    const dateModeTemplate = mode.split('/').join(dateSeparator);
    const dateMask = Array.from(dateModeTemplate).map(char =>
        char === dateSeparator ? char : /\d/,
    );

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateMask, ...Array.from(rangeSeparator), ...dateMask],
        overwriteMode: 'replace',
        preprocessors: [
            createZeroPlaceholdersPreprocessor(),
            createValidDatePreprocessor({
                dateModeTemplate,
                rangeSeparator,
                dateSegmentsSeparator: dateSeparator,
            }),
        ],
        postprocessors: [
            createMinMaxDatePostprocessor({
                min,
                max,
                dateModeTemplate,
                rangeSeparator,
                dateSegmentSeparator: dateSeparator,
            }),
            createMinMaxRangeLengthPostprocessor({
                dateModeTemplate,
                minLength,
                maxLength,
                max,
                rangeSeparator,
            }),
            createSwapDatesPostprocessor({
                dateModeTemplate,
                rangeSeparator,
            }),
        ],
    };
}
