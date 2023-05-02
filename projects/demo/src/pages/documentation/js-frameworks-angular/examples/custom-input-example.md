```ts
import {Component} from '@angular/core';
import {MaskitoOptions, MaskitoElementPredicate} from '@maskito/core';

@Component({
  selector: 'your-component',
  template: `
    <custom-input-wrapper
      [maskito]="maskitoOptions"
      [maskitoElement]="predicate"
    >
      Using maskito with another library
    </custom-input-wrapper>
  `,
})
export class YourComponent {
  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\d+$/,
  };

  readonly predicate: MaskitoElementPredicate = element => element.querySelector('input[id="my-input"]')!;
}
```
