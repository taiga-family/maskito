```ts
import {Maskito, maskitoAdaptContentEditable} from '@maskito/core';

import maskitoOptions from './mask';

const element = document.querySelector<HTMLElement>('[contenteditable]')!;

const maskedInput = new Maskito(maskitoAdaptContentEditable(element), maskitoOptions);

console.info('Call this function when the element is detached from DOM', maskedInput.destroy);
```
