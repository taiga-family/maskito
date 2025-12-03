import"./chunk-ENRHZQ2S.js";var i=`\`\`\`ts
import {Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
  selector: 'your-component',
  template: \`
    <input [maskito]="maskitoOptions" />
  \`,
  imports: [MaskitoDirective],
})
export class YourComponent {
  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\\d+$/,
  };
}
\`\`\`
`;export{i as default};
