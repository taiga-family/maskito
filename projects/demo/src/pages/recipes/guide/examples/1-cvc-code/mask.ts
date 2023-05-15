import {MaskitoOptions} from '@maskito/core';
import {maskitoWithGuide} from '@maskito/kit';

export const GUIDE = 'xxx';

export const {
    /**
     * Use this utility to remove placeholder characters
     * ___
     * @example
     * inputRef.addEventListener('blur', () => {
     *     // 12X => 12
     *     inputRef.value = removeGuide(inputRef.value);
     * });
     */
    removeGuide,
    ...guideOptions
} = maskitoWithGuide(GUIDE);

export default {
    ...guideOptions,
    mask: /^\d{0,3}$/,
} as Required<MaskitoOptions>;
