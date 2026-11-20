import type {MaskitoElement, MaskitoOptions, MaskitoPlugin} from '@maskito/core';

type MaskitoEvent<Name extends string> = Name extends keyof HTMLElementEventMap
    ? HTMLElementEventMap[Name]
    : Event;

export function maskitoEventHandler<Name extends string>(
    name: Name,
    handler: (
        element: MaskitoElement,
        options: Required<MaskitoOptions>,
        event: MaskitoEvent<Name>,
    ) => void,
    eventListenerOptions?: AddEventListenerOptions,
): MaskitoPlugin {
    return (element, maskitoOptions) => {
        const listener = (event: Event): void =>
            handler(element, maskitoOptions, event as MaskitoEvent<Name>);

        element.addEventListener(name, listener, eventListenerOptions);

        return () => element.removeEventListener(name, listener, eventListenerOptions);
    };
}
