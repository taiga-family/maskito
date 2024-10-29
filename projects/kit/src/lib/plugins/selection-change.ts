import type {MaskitoElement, MaskitoOptions, MaskitoPlugin} from '@maskito/core';

export function maskitoSelectionChangeHandler(
    handler: (element: MaskitoElement, options: Required<MaskitoOptions>) => void,
): MaskitoPlugin {
    return (element, options) => {
        const document = element.ownerDocument;
        let isPointerDown = 0;
        const onPointerDown = (): number => isPointerDown++;
        const onPointerUp = (): void => {
            isPointerDown = Math.max(--isPointerDown, 0);
        };

        const listener = (): void => {
            if (isPointerDown) {
                return document.addEventListener('mouseup', listener, {
                    once: true,
                    passive: true,
                });
            }

            handler(element, options);
        };

        document.addEventListener('selectionchange', listener, {passive: true});
        element.addEventListener('mousedown', onPointerDown, {passive: true});
        document.addEventListener('mouseup', onPointerUp, {passive: true});

        return () => {
            document.removeEventListener('selectionchange', listener);
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('mouseup', onPointerUp);
        };
    };
}
