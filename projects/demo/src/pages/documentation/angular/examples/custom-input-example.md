```ts
import {Component} from '@angular/core';
import {MaskitoPredicate} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
  selector: 'your-component',
  template: `
    <tui-input
      [maskito]="maskitoOptions"
      [maskitoElement]="predicate"
    >
      Using maskito with another library
    </tui-input>
  `,
})
export class CustomInputComponent {
  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\d+$/,
  };

  readonly predicate: MaskitoPredicate = element => element.querySelector('input')!;
}
```
