```ts
import {Maskito, MaskitoOptions} from '@maskito/core';
import maskitoOptions from './mask';

const element = document.querySelector('input,textarea')!;
const maskedInput = new Maskito(element, maskitoOptions);

// Call this function when the element is detached from DOM
maskedInput.destroy();
```
