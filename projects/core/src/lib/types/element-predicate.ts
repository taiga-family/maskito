export type MaskitoElementPredicate = (
    element: HTMLElement,
) => HTMLInputElement | HTMLTextAreaElement; // TODO: add `Promise<HTMLInputElement | HTMLTextAreaElement>`

// TODO: delete in v2.0
export type MaskitoElementPredicateAsync = (
    element: HTMLElement,
) => Promise<HTMLInputElement | HTMLTextAreaElement>;
