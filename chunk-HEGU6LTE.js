import"./chunk-TIC6Q35B.js";var m=`\`\`\`ts
import {createApp} from 'vue';
import {maskitoNumber} from '@maskito/kit';
import {maskito} from '@maskito/vue';

createApp({
  template: '<input v-model="value" v-maskito="options" />',
  directives: {maskito},
  data: () => ({
    value: '123_456',
    options: maskitoNumber({
      thousandSeparator: '_',
    }),
  }),
}).mount('#vue');
\`\`\`
`;export{m as default};
