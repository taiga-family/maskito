```ts
import {Maskito, maskitoPipe} from '@maskito/core';

const maskedInput = new Maskito(element, {
  mask: /^\d+$/,
  preprocessor: maskitoPipe(preprocessor1, preprocessor2),
  postprocessor: ({value, selection}) => {
    // ...
  },
  overwriteMode: 'shift',
});

// Call it when the element is destroyed
maskedInput.destroy();
```
