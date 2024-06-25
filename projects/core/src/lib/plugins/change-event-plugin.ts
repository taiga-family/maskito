import type {MaskitoPlugin} from '../types';

export function maskitoChangeEventPlugin(): MaskitoPlugin {
    return element => {
        if (element.isContentEditable) {
            return;
        }

        let value = element.value;

        const focusListener = (): void => {
            value = element.value;
        };
        const changeListener = (): void => {
            value = element.value;
        };
        const blurListener = (): void => {
            if (element.value !== value) {
                element.dispatchEvent(new Event('change'));
            }
        };

        element.addEventListener('focus', focusListener);
        element.addEventListener('change', changeListener);
        element.addEventListener('blur', blurListener);

        return () => {
            element.removeEventListener('focus', focusListener);
            element.removeEventListener('change', changeListener);
            element.removeEventListener('blur', blurListener);
        };
    };
}
