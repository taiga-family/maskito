```tsx
import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumber} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';
import {useForm} from 'react-hook-form';

import {withMaskitoRegister} from './with-maskito-register.ts';

const options: MaskitoOptions = maskitoNumber({maximumFractionDigits: 2});

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
```
