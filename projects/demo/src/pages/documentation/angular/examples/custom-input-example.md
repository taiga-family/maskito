```ts
import {Component, Input} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';

@Component({
  selector: 'tui-input',
  template: `
    <div class="wrapper">
      <!--addional elements-->

      <input [maskito]="maskOptions" />

      <!--addional elements-->
    </div>
  `,
})
export class CustomInputComponent {
  @Input()
  maskOptions: MaskitoOptions;
}
```
