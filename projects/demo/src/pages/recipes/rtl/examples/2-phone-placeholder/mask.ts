import type {MaskitoOptions} from '@maskito/core';
import {maskitoWithPlaceholder} from '@maskito/kit';

import {maskitoWithBidiIsolation} from '../1-date-placeholder/with-bidi-isolation';

const {plugins, ...placeholderOptions} = maskitoWithPlaceholder('+7 (___) ___-__-__');

const options = {
    mask: [
        '+',
        '7',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
    ],
    ...placeholderOptions,
    plugins,
} satisfies MaskitoOptions;

export default maskitoWithBidiIsolation(options, {
    shouldIsolate: (value) => value.length > 0,
});
