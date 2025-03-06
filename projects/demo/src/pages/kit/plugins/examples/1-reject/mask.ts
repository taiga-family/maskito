import type {MaskitoOptions} from '@maskito/core';
import {maskitoRejectEvent} from '@maskito/kit';

const maskitoOptions: MaskitoOptions = {
    mask: /^\d{0,3}$/,
    plugins: [
        // This plugin dispatches custom event `maskitoReject` when a character that the
        // user has entered is rejected by the mask. You can use it to visualize rejection.
        maskitoRejectEvent,
    ],
};

export default maskitoOptions;
