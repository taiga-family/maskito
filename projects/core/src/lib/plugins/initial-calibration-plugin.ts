import type {MaskitoOptions, MaskitoPlugin} from '../types';
import {maskitoTransform, maskitoUpdateElement} from '../utils';

export function maskitoInitialCalibrationPlugin(
    customOptions?: MaskitoOptions,
): MaskitoPlugin {
    return (element, options) => {
        const from = element.selectionStart || 0;
        const to = element.selectionEnd || 0;

        maskitoUpdateElement(element, {
            value: maskitoTransform(element.value, customOptions || options),
            selection: [from, to],
        });
    };
}
