import"./chunk-TIC6Q35B.js";var a=`\`\`\`ts
import {Maskito} from '@maskito/core';

const numberInput = new Maskito(element, {
  mask: /^\\d+(,\\d*)?$/, // digits and comma (as decimal separator)
  preprocessors: [
    ({elementState, data}, actionType) => {
      const {value, selection} = elementState;

      return {
        elementState: {
          selection,
          value: value.replace('.', ','),
        },
        data: data.replace('.', ','),
      };
    },
  ],
});
\`\`\`
`;export{a as default};
