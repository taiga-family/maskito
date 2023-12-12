export type MaskitoElementPredicate = (
    element: HTMLElement,
) =>
    | HTMLInputElement
    | HTMLTextAreaElement
    | Promise<HTMLInputElement | HTMLTextAreaElement>;
