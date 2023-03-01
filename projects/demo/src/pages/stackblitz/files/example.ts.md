```ts
import './styles.css';
import {Maskito} from '@maskito/core';
import mask from './mask';

const element: HTMLInputElement | HTMLTextAreaElement | null = document.querySelector('input, textarea');

if (element) {
  const maskedElement = new Maskito(element, mask);

  console.info('Call this function when the element is detached from DOM', maskedElement.destroy);
}
```
