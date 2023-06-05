export type SyncMaskitoElementPredicate = (
    element: HTMLElement,
) => HTMLInputElement | HTMLTextAreaElement;

export type AsyncMaskitoElementPredicate = (
    element: HTMLElement,
) => Promise<HTMLInputElement | HTMLTextAreaElement>;

export type MaskitoElementPredicate =
    | AsyncMaskitoElementPredicate
    | SyncMaskitoElementPredicate;
