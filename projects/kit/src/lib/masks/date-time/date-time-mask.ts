import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

import {TIME_FIXED_CHARACTERS} from '../../constants';
import {createZeroPlaceholdersPreprocessor} from '../../processors';
import {MaskitoDateMode, MaskitoTimeMode} from '../../types';
import {DATE_TIME_SEPARATOR} from './constants';
import {createMinMaxDateTimePostprocessor} from './postprocessors';
import {createValidDateTimePreprocessor} from './preprocessors';

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
            createZeroPlaceholdersPreprocessor(),
            createValidDateTimePreprocessor({
                dateModeTemplate,
                dateSegmentsSeparator: dateSeparator,
            }),
        ],
        postprocessors: [
            createMinMaxDateTimePostprocessor({
                min,
                max,
                dateModeTemplate,
                timeMode,
            }),
        ],
    };
}
