import {ElementState} from './element-state';

export type MaskPreprocessor = (_: {elementState: ElementState; data?: string}) => {
    elementState: ElementState;
    data?: string;
};

export type MaskPostprocessor = (elementState: ElementState) => ElementState;
