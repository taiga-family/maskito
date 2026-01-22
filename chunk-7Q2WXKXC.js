import"./chunk-TIC6Q35B.js";var t=`\`\`\`ts
import {Maskito} from '@maskito/core';

let howManyWordsAllowed = 5;

const maxWordInput = new Maskito(element, {
  mask: (elementState) => new RegExp('^(\\\\w+\\\\s?){0,' + howManyWordsAllowed + '}$'),
});
\`\`\`
`;export{t as default};
