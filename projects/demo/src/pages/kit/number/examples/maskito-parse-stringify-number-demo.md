```ts
import {
  MaskitoNumberParams,
  maskitoParseNumber,
  maskitoStringifyNumber,
  maskitoNumberOptionsGenerator,
} from '@maskito/kit';

const params: MaskitoNumberParams = {
  decimalSeparator: ',', // default is '.'
};

maskitoNumberOptionsGenerator(params); // MaskitoOptions

maskitoParseNumber('10 000,42', params); // 10000.42

maskitoStringifyNumber(10000.42, params); // '10 000,42'
```
