```ts
import {createApp} from 'vue';
import {maskitoNumber} from '@maskito/kit';
import {maskito} from '@maskito/vue';

createApp({
  template: '<CustomInput v-model="value" v-maskito="options" />',
  directives: {maskito},
  data: () => ({
    value: '123456',
    options: {
      ...maskitoNumber(),
      elementPredicate: (host) => host.querySelector('input')!,
    },
  }),
}).mount('#vue');
```
