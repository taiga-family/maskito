import"./chunk-ENRHZQ2S.js";var m=`\`\`\`ts
import {maskitoParseTime, maskitoStringifyTime, MaskitoTimeParams} from '@maskito/kit';

const params: MaskitoTimeParams = {mode: 'HH:MM:SS.MSS'};

maskitoParseTime('23:59:59.999', params); // 86399999
maskitoParseTime('12:3', params); // 43380000 (parsed like '12:30:00.000')

maskitoStringifyTime(86399999, params); // '23:59:59.999'
\`\`\`
`;export{m as default};
