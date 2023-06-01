export const VUE_DEFAULT_TAB = `import {createApp} from 'vue';
import {maskito} from '@maskito/vue';

import options from './mask';

const app = createApp({
  template: '<input v-maskito="options" />',
  directives: {maskito},
  data: () => ({ options }),
});`;
