import"./chunk-ENRHZQ2S.js";var r=`\`\`\`ts
import {
  maskitoParseNumber,
  type MaskitoNumberParams, // type for 2nd argument of maskitoParseNumber
  maskitoNumberOptionsGenerator,
} from '@maskito/kit';

const params: MaskitoNumberParams = {
  thousandSeparator: '_',
};

maskitoNumberOptionsGenerator(params); // MaskitoOptions

const value: bigint | null = maskitoParseNumber('1_234_567_890_123_456_789', {
  ...params,
  bigint: true,
}); // 1234567890123456789n

value > Number.MAX_SAFE_INTEGER; // true
typeof value === 'bigint'; // true

// "Empty" values
maskitoParseNumber('', {bigint: true}); // null
maskitoParseNumber('-', {bigint: true}); // null
\`\`\`
`;export{r as default};
