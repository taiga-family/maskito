import type {MaskitoPlugin} from '../types';

export function maskitoChangeEventPlugin(): MaskitoPlugin {
    return (element) => {
        if (element.isContentEditable) {
            return;
        }

        let value = element.value;

        const valueListener = (): void => {
            value = element.value;
        };
        const blurListener = (): void => {
            if (element.value !== value) {
                element.dispatchEvent(new Event('change', {bubbles: true}));
            }
        };

        element.addEventListener('focus', valueListener);
        element.addEventListener('change', valueListener);
        element.addEventListener('blur', blurListener);

        return () => {
            element.removeEventListener('focus', valueListener);
            element.removeEventListener('change', valueListener);
            element.removeEventListener('blur', blurListener);
        };
    };
}
