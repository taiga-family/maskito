import"./chunk-ENRHZQ2S.js";var a=`\`\`\`ts
import {Maskito} from '@maskito/core';

const numberInput = new Maskito(element, {
  mask: /^\\d+(,\\d*)?$/,
  postprocessors: [
    ({value, selection}, initialElementState) => {
      const [from, to] = selection;
      const noRepeatedLeadingZeroesValue = value.replace(/^0+/, '0');
      const removedCharacters = value.length - noRepeatedLeadingZeroesValue.length;

      return {
        value: noRepeatedLeadingZeroesValue, // User types "000000" => 0|
        selection: [Math.max(from - removedCharacters, 0), Math.max(to - removedCharacters, 0)],
      };
    },
  ],
});
\`\`\`
`;export{a as default};
