```ts
import {MaskitoOptions} from '@maskito/core';

export default {
  /**
   * ^ – beginning of the string
   * \d – any digit
   * \d* – any number of digits
   * \.? – optional point to start decimal part
   * $ – ending of the string
   */
  mask: /^\d*\.?\d*$/,
} satisfies MaskitoOptions;
```
