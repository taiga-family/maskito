```ts
import {Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';

@Component({
  selector: 'your-component',
  template: `
    <input [maskito]="maskitoOptions" />
  `,
})
export class YourComponent {
  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\d+$/,
  };
}
```
