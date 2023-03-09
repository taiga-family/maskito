import {ElementState} from './element-state';
import {MaskitoPreprocessorAction} from './maskito-preprocessor-action';

export type MaskPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    actionType: MaskitoPreprocessorAction,
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;
