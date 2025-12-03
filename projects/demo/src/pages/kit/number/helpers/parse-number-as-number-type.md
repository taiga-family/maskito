```ts
import {
  maskitoParseNumber,
  type MaskitoNumberParams, // type for 2nd argument of maskitoParseNumber
  maskitoNumberOptionsGenerator,
} from '@maskito/kit';

const params: MaskitoNumberParams = {
  decimalSeparator: ',', // default is '.'
};

maskitoNumberOptionsGenerator(params); // MaskitoOptions

const value: number = maskitoParseNumber('10 000,42', params); // 10000.42

typeof value === 'number'; // true

// "Empty" values
maskitoParseNumber(''); // NaN
maskitoParseNumber('-'); // NaN
```
