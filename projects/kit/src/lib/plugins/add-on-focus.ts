import {MaskitoPlugin} from '@maskito/core';
import {maskitoEventHandler} from './event-handler';

export function maskitoAddOnFocusPlugin(value: string): MaskitoPlugin {
    return maskitoEventHandler('focus', element => {
        if (!element.value) {
            element.value = value;
            element.dispatchEvent(new Event('input'));
        }
    });
}
