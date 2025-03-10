import type {MaskitoOptions} from '@maskito/core';
import {maskitoRejectEvent} from '@maskito/kit';

const maskitoOptions: MaskitoOptions = {
    mask: /^\d{0,3}$/,
    plugins: [maskitoRejectEvent],
};

export default maskitoOptions;
