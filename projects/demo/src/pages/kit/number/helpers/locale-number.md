```ts
import {maskitoNumber} from '@maskito/kit';

// German: dot thousands, comma decimal — e.g. 1.234,56
maskitoNumber({locale: 'de-DE', maximumFractionDigits: 2}); // MaskitoOptions

// Indian: 2+3 grouping — e.g. ₹12,34,567
maskitoNumber({locale: 'en-IN', prefix: '₹'}); // MaskitoOptions

// French: narrow no-break space thousands — e.g. 1 234,56
maskitoNumber({locale: 'fr-FR', maximumFractionDigits: 2}); // MaskitoOptions
```
