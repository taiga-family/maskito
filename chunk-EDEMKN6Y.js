import"./chunk-TIC6Q35B.js";var a=`\`\`\`ts
import {
  maskitoStringifyNumber,
  type MaskitoNumberParams, // type for 2nd argument of maskitoStringifyNumber
  maskitoNumberOptionsGenerator,
} from '@maskito/kit';

const params: MaskitoNumberParams = {
  thousandSeparator: '_',
  prefix: '$',
};

maskitoNumberOptionsGenerator(params); // MaskitoOptions

maskitoStringifyNumber(null); // ''
maskitoStringifyNumber(NaN); // ''
maskitoStringifyNumber(1234, params); // '$1_234'
maskitoStringifyNumber(BigInt('1234'), params); // '$1_234'
\`\`\`
`;export{a as default};
