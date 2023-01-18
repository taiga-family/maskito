```ts
import {Maskito, maskitoPipe} from '@maskito/core';

const expireDateInput = new Maskito(element, {
  mask: [/\d/, /\d/, '/', /\d/, /\d/],
  preprocessor: maskitoPipe(
    preprocessor1, // order matters
    createPreprocessor2(arg1, arg2),
  ),
  postprocessor: maskitoPipe(
    postprocessor1,
    postprocessor2,
    // stack any number of processors
    postprocessor3,
  ),
});
```
