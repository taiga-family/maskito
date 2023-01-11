```ts
import {Maskito, maskitoPipe} from '@maskito/core';

const maskedInput = new Maskito(this.element, {
  mask: /\d+/,
  preprocessor: maskitoPipe(preprocessor1, preprocessor2),
  postprocessor: ({value, selection}) => {
    // ...
  },
  overwriteMode: 'shift',
});
```
