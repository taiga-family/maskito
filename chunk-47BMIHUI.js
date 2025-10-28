import"./chunk-6M32EY24.js";var n=`\`\`\`ts
import {Maskito} from '@maskito/core';

import maskitoOptions from './mask';

const element = document.querySelector('input')!;

element.value = '12345'; // patch with invalid initial value

// enable mask
const maskedInput = new Maskito(element, maskitoOptions);

console.info(element.value); // 123

// Call this function when the element is detached from DOM
maskedInput.destroy();
\`\`\`
`;export{n as default};
