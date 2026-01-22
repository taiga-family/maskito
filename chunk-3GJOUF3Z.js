import"./chunk-TIC6Q35B.js";var o=`\`\`\`ts
import './styles.css';

import type {MaskitoElement} from '@maskito/core';
import {Maskito} from '@maskito/core';
import options from './mask';

const element: MaskitoElement = document.querySelector('input,textarea')!;
const mask = new Maskito(element, options);

console.info('Call this function when the element is detached from DOM', mask.destroy);
\`\`\`
`;export{o as default};
