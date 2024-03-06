import type {MaskitoOptions, MaskitoPlugin} from '../types';
import {maskitoUpdateElement} from './dom/update-element';
import {maskitoTransform} from './transform';

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
