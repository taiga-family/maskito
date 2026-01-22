import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';
// @ts-ignore
import {useForm} from 'react-hook-form';

import {withMaskitoRegister} from './with-maskito-register';

const options: MaskitoOptions = maskitoNumberOptionsGenerator({maximumFractionDigits: 2});

export const App: ComponentType = () => {
    const maskitoRef = useMaskito({options});
    const {register, watch} = useForm();

    const value = watch('controlName');

    console.info('[controlName]: ', value);

    return (
        <input
            placeholder="Enter number"
            {...withMaskitoRegister(register('controlName'), maskitoRef)}
        />
    );
};
