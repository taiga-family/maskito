```ts
import {
  maskitoStringifyNumber,
  type MaskitoNumberParams, // type for 2nd argument of maskitoStringifyNumber
  maskitoNumber,
} from '@maskito/kit';

const params: MaskitoNumberParams = {
  thousandSeparator: '_',
  prefix: '$',
};

maskitoNumber(params); // MaskitoOptions

maskitoStringifyNumber(null); // ''
maskitoStringifyNumber(NaN); // ''
maskitoStringifyNumber(1234, params); // '$1_234'
maskitoStringifyNumber(BigInt('1234'), params); // '$1_234'
```
