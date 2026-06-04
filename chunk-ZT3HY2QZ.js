import"./chunk-TIC6Q35B.js";var a=`\`\`\`ts
import {maskitoNumber} from '@maskito/kit';

// German: dot thousands, comma decimal \u2014 e.g. 1.234,56
maskitoNumber({locale: 'de-DE', maximumFractionDigits: 2}); // MaskitoOptions

// Indian: 2+3 grouping \u2014 e.g. \u20B912,34,567
maskitoNumber({locale: 'en-IN', prefix: '\u20B9'}); // MaskitoOptions

// French: narrow no-break space thousands \u2014 e.g. 1 234,56
maskitoNumber({locale: 'fr-FR', maximumFractionDigits: 2}); // MaskitoOptions
\`\`\`
`;export{a as default};
