import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'javascript-logo',
    imports: [TuiSvgModule],
    template: `
        <tui-svg src="assets/icons/javascript.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JavaScriptLogoComponent {}

export const JAVASCRIPT_LOGO = new PolymorpheusComponent(JavaScriptLogoComponent);
