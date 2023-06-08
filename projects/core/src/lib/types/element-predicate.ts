export type MaskitoElementPredicate = (
    element: HTMLElement,
) => HTMLInputElement | HTMLTextAreaElement;

export type MaskitoElementPredicateAsync = (
    element: HTMLElement,
) => Promise<HTMLInputElement | HTMLTextAreaElement>;
