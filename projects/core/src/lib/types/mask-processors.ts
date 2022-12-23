import {ElementState} from './element-state';

export type MaskPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    actionType: 'insert' | 'deleteForward' | 'deleteBackward' | 'validation',
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;
