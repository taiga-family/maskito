```ts
import {Maskito} from '@maskito/core';

const maskedInput = new Maskito(element, {
  mask: /^\d+$/,
  preprocessors: [preprocessor1, preprocessor2],
  postprocessors: [
    ({value, selection}) => {
      // ...
    },
  ],
  overwriteMode: 'shift',
});

// Call it when the element is destroyed
maskedInput.destroy();
```
