import {ElementState} from './element-state';

export type MaskPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    actionType: MaskPreprocessorAction,
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;

export enum MaskPreprocessorAction {
    DeleteBackward = 'deleteBackward',
    DeleteForward = 'deleteForward',
    Insert = 'insert',
    Validation = 'validation',
}
