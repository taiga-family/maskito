import type {MaskitoOptions} from './mask-options';
import type {MaskitoElement} from './maskito-element';

export type MaskitoPlugin = (
    element: HTMLInputElement | HTMLTextAreaElement | MaskitoElement,
    options: Required<MaskitoOptions>,
) => (() => void) | void;
