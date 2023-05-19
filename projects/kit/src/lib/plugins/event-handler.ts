import {MaskitoPlugin} from '@maskito/core';

export function maskitoEventHandler(
    name: string,
    handler: (element: HTMLInputElement | HTMLTextAreaElement) => void,
): MaskitoPlugin {
    return (element: HTMLInputElement | HTMLTextAreaElement): (() => void) => {
        const listener = (): void => handler(element);

        element.addEventListener(name, listener);

        return () => element.removeEventListener(name, listener);
    };
}
