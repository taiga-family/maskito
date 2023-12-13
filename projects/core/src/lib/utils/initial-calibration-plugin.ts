import {MaskitoOptions, MaskitoPlugin} from '../types';
import {maskitoTransform} from './transform';

export function maskitoInitialCalibrationPlugin(
    customOptions?: MaskitoOptions,
): MaskitoPlugin {
    return (element, options) => {
        const from = element.selectionStart || 0;
        const to = element.selectionEnd || 0;

        element.value = maskitoTransform(element.value, customOptions || options);
        element.dispatchEvent(new Event('input'));
        element?.setSelectionRange(from, to);
    };
}
