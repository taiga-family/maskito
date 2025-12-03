import"./chunk-ENRHZQ2S.js";var r=`import type {RefCallback} from 'react';
// @ts-ignore
import type {UseFormRegisterReturn} from 'react-hook-form';

const noop = async (): Promise<void> => {};

export const withMaskitoRegister = (
    registerResult: UseFormRegisterReturn,
    maskitoRef: RefCallback<HTMLElement | null>,
): UseFormRegisterReturn & {onInput: UseFormRegisterReturn['onChange']} => {
    const ref: RefCallback<HTMLElement | null> = (node): void => {
        registerResult.ref(node);
        maskitoRef(node);
    };

    return {
        ...registerResult,
        ref,
        onInput: registerResult.onChange,
        onChange: noop,
    };
};
`;export{r as default};
