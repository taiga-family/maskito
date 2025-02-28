```ts
import {maskitoParseDate, maskitoStringifyDate, MaskitoDateParams} from '@maskito/kit';

export interface MaskitoDateParams {
  mode: MaskitoDateMode;
  separator?: string;
  max?: Date;
  min?: Date;
}

const params: MaskitoDateParams = {
  mode: 'dd/mm/yyyy',
  separator: '/', // default is '.'
};

maskitoParseDate('05/02/2004', params); // returns Date object

maskitoStringifyDate(new Date('2004-02-05'), params); // '05/02/2004'
```
