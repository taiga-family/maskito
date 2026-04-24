import {MASKITO_DEFAULT_OPTIONS, type MaskitoOptions} from '@maskito/core';

import {
    createDateSegmentsZeroPaddingPostprocessor,
    createFullWidthToHalfWidthPreprocessor,
    createMinMaxDatePostprocessor,
    createValidDatePreprocessor,
    createZeroPlaceholdersPreprocessor,
    normalizeDatePreprocessor,
} from '../../processors';
import type {MaskitoDateParams} from './date-params';
import {getLocaleDateParams} from './utils/get-locale-date-params';

export function maskitoDate(
    {locale = '', ...params}: MaskitoDateParams = {mode: 'dd/mm/yyyy'},
): Required<MaskitoOptions> {
    const localeParams = locale ? getLocaleDateParams(locale) : null;
    const mode = params.mode ?? localeParams?.mode ?? 'dd/mm/yyyy';
    const dateSeparator = params.separator ?? localeParams?.separator ?? '.';
    const dateModeTemplate = mode.split('/').join(dateSeparator);

    return {
        ...MASKITO_DEFAULT_OPTIONS,
        mask: [...dateModeTemplate].map((char) =>
            dateSeparator.includes(char) ? char : /\d/,
        ),
        overwriteMode: 'replace',
        preprocessors: [
            createFullWidthToHalfWidthPreprocessor(),
            createZeroPlaceholdersPreprocessor(),
            normalizeDatePreprocessor({
                dateModeTemplate,
                dateSeparator,
            }),
            createValidDatePreprocessor({
                dateModeTemplate,
                dateSeparator,
            }),
        ],
        postprocessors: [
            createDateSegmentsZeroPaddingPostprocessor({
                dateModeTemplate,
                dateSeparator,
                splitFn: (value) => ({dateStrings: [value]}),
                uniteFn: ([dateString = '']) => dateString,
            }),
            createMinMaxDatePostprocessor({
                ...params,
                dateModeTemplate,
                dateSeparator,
            }),
        ],
    };
}

export {
    /**
     * @deprecated Use {@link maskitoDate} instead.
     */
    maskitoDate as maskitoDateOptionsGenerator,
};
