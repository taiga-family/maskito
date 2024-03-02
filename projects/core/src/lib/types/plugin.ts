import {MaskitoOptions} from './mask-options';
import {MaskitoElement} from './maskito-element';

export type MaskitoPlugin = (
    element: MaskitoElement,
    options: Required<MaskitoOptions>,
) => (() => void) | void;
