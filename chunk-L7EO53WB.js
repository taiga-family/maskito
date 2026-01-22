import"./chunk-TIC6Q35B.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoPrefixPostprocessorGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
    mask: /^\\$?\\d*$/, // dollar sign or digits
    postprocessors: [maskitoPrefixPostprocessorGenerator('$')],
    plugins: [maskitoAddOnFocusPlugin('$'), maskitoRemoveOnBlurPlugin('$')],
} satisfies MaskitoOptions;
`;export{i as default};
