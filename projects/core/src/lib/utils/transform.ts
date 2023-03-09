import {MaskModel} from '../classes';
import {MASKITO_DEFAULT_OPTIONS} from '../constants';
import {ElementState, MaskitoOptions, MaskPreprocessorAction} from '../types';

export function maskitoTransform(value: string, maskitoOptions: MaskitoOptions): string;
export function maskitoTransform(
    state: ElementState,
    maskitoOptions: MaskitoOptions,
): ElementState;

export function maskitoTransform(
    valueOrState: ElementState | string,
    maskitoOptions: MaskitoOptions,
): ElementState | string {
    const options: Required<MaskitoOptions> = {
        ...MASKITO_DEFAULT_OPTIONS,
        ...maskitoOptions,
    };
    const initialElementState: ElementState =
        typeof valueOrState === 'string'
            ? {value: valueOrState, selection: [0, 0]}
            : valueOrState;

    const {elementState} = options.preprocessor(
        {elementState: initialElementState, data: ''},
        MaskPreprocessorAction.Validation,
    );
    const maskModel = new MaskModel(elementState, options);
    const {value, selection} = options.postprocessor(maskModel, initialElementState);

    return typeof valueOrState === 'string' ? value : {value, selection};
}
