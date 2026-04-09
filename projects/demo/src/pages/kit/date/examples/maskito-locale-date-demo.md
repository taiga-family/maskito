```ts
import {maskitoLocaleDate} from '@maskito/kit';

// US: mm/dd/yyyy — e.g. 12/25/2000
maskitoLocaleDate('en-US'); // MaskitoOptions

// German: dd.mm.yyyy — e.g. 25.12.2000
maskitoLocaleDate('de-DE', {min: new Date(2000, 0, 1)}); // MaskitoOptions

// Chinese: yyyy/mm/dd — e.g. 2000/12/25
maskitoLocaleDate('zh-CN'); // MaskitoOptions
```
