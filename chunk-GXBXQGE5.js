import"./chunk-6M32EY24.js";var e=`\`\`\`ts
import {Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions, MaskitoElementPredicate} from '@maskito/core';

@Component({
  selector: 'your-component',
  template: \`
    <custom-input-wrapper
      [maskito]="maskitoOptions"
      [maskitoElement]="predicate"
    >
      Using maskito with another library
    </custom-input-wrapper>
  \`,
  imports: [MaskitoDirective],
})
export class YourComponent {
  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\\d+$/,
  };

  readonly predicate: MaskitoElementPredicate = (element) => element.querySelector('input[id="my-input"]')!;
}
\`\`\`
`;export{e as default};
