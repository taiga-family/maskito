```ts
import {Component} from '@angular/core';
import {MaskitoModule} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';

import mask from './mask';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [MaskitoModule],
  template: `
    <input [maskito]="options" />
  `,
})
export class App {
  readonly options: MaskitoOptions = mask;
}
```
