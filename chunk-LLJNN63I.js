import"./chunk-TIC6Q35B.js";var o=`\`\`\`ts
import {createApp} from 'vue';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {maskito} from '@maskito/vue';

createApp({
  template: '<CustomInput v-model="value" v-maskito="options" />',
  directives: {maskito},
  data: () => ({
    value: '123456',
    options: {
      ...maskitoNumberOptionsGenerator(),
      elementPredicate: (host) => host.querySelector('input')!,
    },
  }),
}).mount('#vue');
\`\`\`
`;export{o as default};
