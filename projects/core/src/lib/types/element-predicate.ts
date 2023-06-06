export type MaskitoElementPredicateSync = (
    element: HTMLElement,
) => HTMLInputElement | HTMLTextAreaElement;

export type MaskitoElementPredicateAsync = (
    element: HTMLElement,
) => Promise<HTMLInputElement | HTMLTextAreaElement>;

export type MaskitoElementPredicate =
    | MaskitoElementPredicateAsync
    | MaskitoElementPredicateSync;
