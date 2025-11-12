export const ANGULAR_DEFAULT_TAB = `import {Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';

import mask from './mask';

@Component({
  selector: 'my-app',
  imports: [MaskitoDirective],
  template: '<input [maskito]="options" />',
})
export class App {
  readonly options: MaskitoOptions = mask;
}`;
