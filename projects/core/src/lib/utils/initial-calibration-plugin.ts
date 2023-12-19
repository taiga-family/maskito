import {MaskitoOptions, MaskitoPlugin} from '../types';
import {maskitoSetElementValue} from './dom/set-element-value';
import {maskitoTransform} from './transform';

export function maskitoInitialCalibrationPlugin(
    customOptions?: MaskitoOptions,
): MaskitoPlugin {
    return (element, options) => {
        const from = element.selectionStart || 0;
        const to = element.selectionEnd || 0;

        maskitoSetElementValue(
            element,
            maskitoTransform(element.value, customOptions || options),
        );
        element.setSelectionRange?.(from, to);
    };
}
