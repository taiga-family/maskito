export type MaskitoElementPredicate<T extends HTMLElement = HTMLElement> = (
    element: T,
) =>
    | HTMLInputElement
    | HTMLTextAreaElement
    | Promise<HTMLInputElement | HTMLTextAreaElement>;
