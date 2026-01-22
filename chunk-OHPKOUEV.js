import"./chunk-TIC6Q35B.js";var e=`\`\`\`ts
import './animation.css';

import {Maskito} from '@maskito/core';

import maskitoOptions from './mask';

const element = document.querySelector('input')!;
const maskedInput = new Maskito(element, maskitoOptions);

console.info('Call this function when the element is detached from DOM', maskedInput.destroy);
\`\`\`
`;export{e as default};
