export function maskitoRejectEvent(
    element: HTMLInputElement | HTMLTextAreaElement,
): () => void {
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
}
