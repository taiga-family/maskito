```ts
import {maskitoLocaleDateRange} from '@maskito/kit';

// US: mm/dd/yyyy – mm/dd/yyyy — e.g. 12/25/2000 – 01/01/2001
maskitoLocaleDateRange('en-US'); // MaskitoOptions

// German: dd.mm.yyyy – dd.mm.yyyy — e.g. 25.12.2000 – 01.01.2001
maskitoLocaleDateRange('de-DE'); // MaskitoOptions

// Override range separator
maskitoLocaleDateRange('en-US', {rangeSeparator: ' ~ '}); // MaskitoOptions
```
