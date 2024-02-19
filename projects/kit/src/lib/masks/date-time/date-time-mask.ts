import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {TIME_FIXED_CHARACTERS} from '../../constants';
import {
    createColonConvertPreprocessor,
    createDateSegmentsZeroPaddingPostprocessor,
    createFirstDateEndSeparatorPreprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import {MaskitoDateMode, MaskitoTimeMode} from '../../types';
import {DATE_TIME_SEPARATOR, POSSIBLE_DATE_TIME_SEPARATOR} from './constants';
import {createMinMaxDateTimePostprocessor} from './postprocessors';
import {createValidDateTimePreprocessor} from './preprocessors';
import {parseDateTimeString} from './utils';

export function maskitoDateTimeOptionsGenerator({
    dateMode,
    timeMode,
    dateSeparator = '.',
    min,
    max,
}: {
    dateMode: MaskitoDateMode;
    timeMode: MaskitoTimeMode;
    dateSeparator?: string;
    max?: Date;
    min?: Date;
}): Required<MaskitoOptions> {
    const dateModeTemplate = dateMode.split('/').join(dateSeparator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [
            ...Array.from(dateModeTemplate).map(char =>
                char === dateSeparator ? char : /\d/,
            ),
            ...DATE_TIME_SEPARATOR.split(''),
            ...Array.from(timeMode).map(char =>
                TIME_FIXED_CHARACTERS.includes(char) ? char : /\d/,
            ),
        ],
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createColonConvertPreprocessor(),
            createFirstDateEndSeparatorPreprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                firstDateEndSeparator: DATE_TIME_SEPARATOR,
                pseudoFirstDateEndSeparators: POSSIBLE_DATE_TIME_SEPARATOR,
            }),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
            }),
            createValidDateTimePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSegmentSeparator: dateSeparator,
                splitFn: value => {
                    const [dateString, timeString] = parseDateTimeString(
                        value,
                        dateModeTemplate,
                    );

                    return {dateStrings: [dateString], restPart: timeString};
                },
                uniteFn: ([validatedDateString], initialValue) =>
                    validatedDateString +
                    (initialValue.includes(DATE_TIME_SEPARATOR)
                        ? DATE_TIME_SEPARATOR
                        : ''),
            }),
            createMinMaxDateTimePostprocessor({
                min,
                max,
                dateModeTemplate,
                timeMode,
            }),
        ],
    };
}
