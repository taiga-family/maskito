import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'javascript-logo',
    template: '<img src="assets/icons/javascript.svg" />',
    styles: ['img {display: flex; width: 1.5rem}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JavaScriptLogoComponent {}

export const JAVASCRIPT_LOGO = new PolymorpheusComponent(JavaScriptLogoComponent);
