import type {MaskitoElement, MaskitoOptions, MaskitoPlugin} from '@maskito/core';

export function maskitoEventHandler(
    name: string,
    handler: (element: MaskitoElement, options: Required<MaskitoOptions>) => void,
    eventListenerOptions?: AddEventListenerOptions,
): MaskitoPlugin {
    return (element, maskitoOptions) => {
        const listener = (): void => handler(element, maskitoOptions);

        element.addEventListener(name, listener, eventListenerOptions);

        return () => element.removeEventListener(name, listener, eventListenerOptions);
    };
}
