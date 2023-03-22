import {ElementState} from './element-state';

export type MaskPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    actionType: 'deleteBackward' | 'deleteForward' | 'insert' | 'validation',
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;
