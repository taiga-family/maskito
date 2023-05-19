import {MaskitoOptions} from '@maskito/core';

export function maskitoEventHandler(
    name: string,
    handler: (element: HTMLInputElement | HTMLTextAreaElement) => void,
): NonNullable<MaskitoOptions['plugins']>[0] {
    return (element: HTMLInputElement | HTMLTextAreaElement): (() => void) => {
        const listener = (): void => handler(element);

        element.addEventListener(name, listener);

        return () => element.removeEventListener(name, listener);
    };
}
