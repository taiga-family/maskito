import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'javascript-logo',
    template: `
        <tui-svg src="assets/icons/javascript.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JavaScriptLogoComponent {}

export const JAVASCRIPT_LOGO = new PolymorpheusComponent(JavaScriptLogoComponent);
