import"./chunk-6M32EY24.js";var s=`\`\`\`ts
import {maskitoParseDate, maskitoStringifyDate, MaskitoDateParams} from '@maskito/kit';

const params: MaskitoDateParams = {
  mode: 'dd/mm/yyyy',
  separator: '/', // default is '.'
};

maskitoParseDate('05/02/2004', params); // returns Date object

maskitoStringifyDate(new Date('2004-02-05'), params); // '05/02/2004'
\`\`\`
`;export{s as default};
