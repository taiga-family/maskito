import"./chunk-ENRHZQ2S.js";var o=`\`\`\`js
import {Maskito, MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';

const element = document.querySelector('input,textarea');

let maskedInput;

(async function initMask() {
  const maskitoOptions = maskitoPhoneOptionsGenerator({
    countryIsoCode: 'RU',
    metadata: await import('libphonenumber-js/min/metadata').then((m) => m.default),
  });

  maskedInput = new Maskito(element, maskitoOptions);
})();

// Call this function when the element is detached from DOM
maskedInput.destroy();
\`\`\`
`;export{o as default};
