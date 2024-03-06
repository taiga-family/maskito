import type {MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
    mask: /^\d{0,3}$/,
    plugins: [
        // This plugin dispatches custom event `maskitoReject` when a character that the
        // user has entered is rejected by the mask. You can use it to visualize rejection.
        element => {
            const listener = (): void => {
                // Save current input value
                const value = element.value;

                element.addEventListener(
                    'beforeinput',
                    event => {
                        // If event was prevented and value is the same, then it was rejected
                        if (event.defaultPrevented && value === element.value) {
                            element.dispatchEvent(
                                new CustomEvent('maskitoReject', {bubbles: true}),
                            );
                        }
                    },
                    {once: true},
                );
            };

            // Using capture phase to trigger callback before any other listeners
            element.addEventListener('beforeinput', listener, true);

            // Cleanup
            return () => element.removeEventListener('beforeinput', listener, true);
        },
    ],
};

export default maskitoOptions;
