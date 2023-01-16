```ts
import {Maskito} from '@maskito/core';

const numberInput = new Maskito(element, {
  mask: /^\d+(,\d*)?$/, // digits and dot (as decimal separator)
  preprocessor: ({elementState, data}, actionType) => {
    const {value, selection} = elementState;

    return {
      elementState: {
        selection,
        value: value.replace(',', '.'),
      },
      data: data.replace(',', '.'),
    };
  },
});
```
