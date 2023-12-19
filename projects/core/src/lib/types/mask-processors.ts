import {ElementState} from './element-state';
import {TypedInputEvent} from './typed-input-event';

export interface MaskitoPreprocessorMetadata {
    readonly eventName: 'beforeinput' | 'compositionend' | 'input';
    readonly inputType: TypedInputEvent['inputType'] | '';
}

export type MaskitoPreprocessor = (
    _: {
        elementState: ElementState;
        data: string;
    },
    metadata: MaskitoPreprocessorMetadata,
) => {
    elementState: ElementState;
    data?: string;
};

export type MaskitoPostprocessor = (
    elementState: ElementState,
    initialElementState: ElementState,
) => ElementState;
