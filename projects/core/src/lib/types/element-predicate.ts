import type {MaskitoElement} from './maskito-element';

export type MaskitoElementPredicate = (
    element: HTMLElement,
) => MaskitoElement | Promise<MaskitoElement>;
