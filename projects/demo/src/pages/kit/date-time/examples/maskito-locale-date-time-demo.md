```ts
import {maskitoLocaleDateTime} from '@maskito/kit';

// US: mm/dd/yyyy, HH:MM — e.g. 12/25/2000, 14:30
maskitoLocaleDateTime('en-US'); // MaskitoOptions

// German: dd.mm.yyyy, HH:MM — e.g. 25.12.2000, 14:30
maskitoLocaleDateTime('de-DE'); // MaskitoOptions

// Override time mode
maskitoLocaleDateTime('de-DE', {timeMode: 'HH:MM:SS'}); // MaskitoOptions
```
