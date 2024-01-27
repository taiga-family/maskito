```ts
import {Maskito} from '@maskito/core';

// TODO: write better example
const element: HTMLElement = document.querySelector('[contenteditable="true"]')!;

const maskedContentEditable = new Maskito(element, {
  mask: /^[a-z\s]+$/i,
});

// Call it when the element is detached from DOM
maskedContentEditable.destroy();
```
