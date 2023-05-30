```ts
import {createApp} from 'vue';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {maskito} from '@maskito/vue';

createApp({
  template: '<input v-model="value" v-maskito="options" />',
  directives: {maskito},
  data: () => ({
    value: '123456',
    options: maskitoNumberOptionsGenerator(),
  }),
}).mount('#vue');
```
