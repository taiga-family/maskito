import"./chunk-6M32EY24.js";var t=`\`\`\`ts
import {Maskito} from '@maskito/core';

let howManyWordsAllowed = 5;

const maxWordInput = new Maskito(element, {
  mask: (elementState) => new RegExp('^(\\\\w+\\\\s?){0,' + howManyWordsAllowed + '}$'),
});
\`\`\`
`;export{t as default};
