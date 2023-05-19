import {MaskitoOptions} from './mask-options';

export type Plugin = (
    element: HTMLInputElement | HTMLTextAreaElement,
    options: Required<MaskitoOptions>,
) => (() => void) | void;
