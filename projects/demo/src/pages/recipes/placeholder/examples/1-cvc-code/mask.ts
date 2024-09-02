import type {MaskitoOptions} from '@maskito/core';
import {maskitoWithPlaceholder} from '@maskito/kit';

export default {
    ...maskitoWithPlaceholder('xxx'),
    mask: /^\d{0,3}$/,
} satisfies MaskitoOptions;
