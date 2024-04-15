import type {MaskitoOptions} from './mask-options';
import type {MaskitoElement} from './maskito-element';

export type MaskitoPlugin = (
    element: MaskitoElement,
    options: Required<MaskitoOptions>,
) => (() => void) | void;
