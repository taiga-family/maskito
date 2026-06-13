import type {MaskitoOptions} from '@maskito/core';
import {maskitoDate, maskitoWithPlaceholder} from '@maskito/kit';

import {maskitoWithBidiIsolation} from './with-bidi-isolation';

const dateOptions = maskitoDate({
    mode: 'dd/mm/yyyy',
    separator: '/',
});

const {plugins, ...placeholderOptions} = maskitoWithPlaceholder('dd/mm/yyyy', true);

const options = {
    ...dateOptions,
    plugins: plugins.concat(dateOptions.plugins),
    preprocessors: [...placeholderOptions.preprocessors, ...dateOptions.preprocessors],
    postprocessors: [...dateOptions.postprocessors, ...placeholderOptions.postprocessors],
} satisfies Required<MaskitoOptions>;

export default maskitoWithBidiIsolation(options, {
    shouldIsolate: (value) =>
        value !== 'dd/mm/yyyy' && !/^\d{2}\/\d{2}\/\d{4}$/u.test(value),
});
