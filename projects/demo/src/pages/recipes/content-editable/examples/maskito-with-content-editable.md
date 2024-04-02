```ts
import {Maskito, maskitoAdaptContentEditable, MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
  mask: /^\d+$/,
};

const element = document.querySelector<HTMLElement>('[contenteditable]')!;

const maskedInput = new Maskito(
  maskitoAdaptContentEditable(element), // <-- This is the only difference
  maskitoOptions,
);
```
