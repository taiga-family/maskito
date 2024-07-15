import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgComponent} from '@taiga-ui/legacy';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    standalone: true,
    selector: 'javascript-logo',
    imports: [TuiSvgComponent],
    template: `
        <tui-svg src="assets/icons/javascript.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JavaScriptLogoComponent {}

export const JAVASCRIPT_LOGO = new PolymorpheusComponent(JavaScriptLogoComponent);
