export type SyncMaskitoElementPredicate<T extends HTMLElement = HTMLElement> = (
    element: T,
) => HTMLInputElement | HTMLTextAreaElement;

export type AsyncMaskitoElementPredicate<T extends HTMLElement = HTMLElement> = (
    element: T,
) => Promise<HTMLInputElement | HTMLTextAreaElement>;

export type MaskitoElementPredicate<T extends HTMLElement = HTMLElement> =
    | AsyncMaskitoElementPredicate<T>
    | SyncMaskitoElementPredicate<T>;
