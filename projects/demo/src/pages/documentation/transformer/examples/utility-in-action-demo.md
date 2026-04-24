```ts
import {maskitoTransform} from '@maskito/core';
import {maskitoNumber} from '@maskito/kit';

const maskitoOptions = maskitoNumber({
  thousandSeparator: ' ',
});

const definitelyValidValue = maskitoTransform('1000000', maskitoOptions);

console.info(definitelyValidValue); // '1 000 000'

// Framework agnostic way | index.ts
inputElement.value = definitelyValidValue;

// Angular way | app.component.ts
this.formControl.patchValue(definitelyValidValue);
```
