import type {MaskitoPlugin} from '@maskito/core';

export const maskitoRejectEvent: MaskitoPlugin = element => {
    const listener = (): void => {
        const value = element.value;

        element.addEventListener(
            'beforeinput',
            event => {
                if (event.defaultPrevented && value === element.value) {
                    element.dispatchEvent(
                        new CustomEvent('maskitoReject', {bubbles: true}),
                    );
                }
            },
            {once: true},
        );
    };

    element.addEventListener('beforeinput', listener, true);

    return () => element.removeEventListener('beforeinput', listener, true);
};
