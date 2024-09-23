import type {RefCallback} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';

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
        onChange: undefined,
    };
};
