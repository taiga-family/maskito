import"./chunk-TIC6Q35B.js";var e=`\`\`\`ts
import {maskitoParseDateTime, maskitoStringifyDateTime, MaskitoDateTimeParams} from '@maskito/kit';

const params: MaskitoDateTimeParams = {
  dateMode: 'dd/mm/yyyy',
  timeMode: 'HH:MM',
  dateSeparator: ', ',
};

maskitoParseDateTime('07.11.2022, 13:17', params); // returns Date object
maskitoStringifyDateTime(new Date(2022, 10, 7, 13, 17), params); // '07.11.2022, 13:17'
\`\`\`
`;export{e as default};
