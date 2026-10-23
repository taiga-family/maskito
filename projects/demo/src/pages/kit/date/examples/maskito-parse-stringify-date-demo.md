```ts
import {maskitoParseDate, maskitoStringifyDate, MaskitoDateParams} from '@maskito/kit';

const params: MaskitoDateParams = {
  mode: 'dd/mm/yyyy',
  separator: '/', // default is '.'
};

maskitoParseDate('05/02/2004', params); // returns Date object
maskitoParseDate('31/02/2026', params); // null: impossible calendar date

maskitoStringifyDate(new Date('2004-02-05'), params); // '05/02/2004'
```
