import"./chunk-6M32EY24.js";var a=`\`\`\`ts
import {Maskito} from '@maskito/core';

const element: HTMLTextAreaElement = document.querySelector('textarea')!;

const maskedTextarea = new Maskito(element, {
  mask: /^[a-z\\s]+$/i,
});

// Call it when the element is detached from DOM
maskedTextarea.destroy();
\`\`\`
`;export{a as default};
