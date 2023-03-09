import {MaskitoOptions} from '@maskito/core';

export default {
    mask: [/\d/, /\d/, ':', /\d/, /\d/, ...' pm'],
    overwriteMode: 'replace',
} as MaskitoOptions;
