```ts
import {maskitoParseDateTime, maskitoStringifyDateTime, MaskitoDateTimeParams} from '@maskito/kit';

const params: MaskitoDateTimeParams = {
  dateMode: 'dd/mm/yyyy',
  timeMode: 'HH:MM',
  dateSeparator: ', ',
};

maskitoParseDateTime('07.11.2022, 13:17', params); // returns Date object
maskitoParseDateTime('31.02.2026, 13:17', params); // null: impossible calendar date
maskitoStringifyDateTime(new Date(2022, 10, 7, 13, 17), params); // '07.11.2022, 13:17'
```
