import {MaskitoOptions, MaskitoPlugin} from '@maskito/core';

export function maskitoEventHandler(
    name: string,
    handler: (
        element: HTMLInputElement | HTMLTextAreaElement,
        options: Required<MaskitoOptions>,
    ) => void,
): MaskitoPlugin {
    return (element, options) => {
        const listener = (): void => handler(element, options);

        element.addEventListener(name, listener);

        return () => element.removeEventListener(name, listener);
    };
}
