import type {ElementState} from './element-state';

export type MaskitoPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    actionType: 'deleteBackward' | 'deleteForward' | 'insert' | 'validation',
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskitoPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;
