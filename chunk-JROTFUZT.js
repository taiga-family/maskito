import"./chunk-TIC6Q35B.js";var e=`\`\`\`ts
import './styles.css';

import type {MaskitoElement, MaskitoOptions} from '@maskito/core';
import {Maskito} from '@maskito/core';

const options: MaskitoOptions = {
  mask: /^\\d+$/,
};

const element: MaskitoElement = document.querySelector('input,textarea')!;
const mask = new Maskito(element, options);

console.info('Call this function when the element is detached from DOM', mask.destroy);
\`\`\`
`;export{e as default};
