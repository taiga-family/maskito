import type {MaskitoOptions} from './mask-options';

export type MaskitoPlugin = (
    element: HTMLInputElement | HTMLTextAreaElement,
    options: Required<MaskitoOptions>,
) => (() => void) | void;
