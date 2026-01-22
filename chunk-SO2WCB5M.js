import"./chunk-TIC6Q35B.js";var o=`\`\`\`ts
import {Maskito, maskitoAdaptContentEditable, MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
  mask: /^\\d+$/,
};

const element = document.querySelector<HTMLElement>('[contenteditable]')!;

const maskedInput = new Maskito(
  maskitoAdaptContentEditable(element), // <-- This is the only difference
  maskitoOptions,
);
\`\`\`
`;export{o as default};
