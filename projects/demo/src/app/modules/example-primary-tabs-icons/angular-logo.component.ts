import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'angular-logo',
    imports: [TuiSvgModule],
    template: `
        <tui-svg src="assets/icons/angular.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularLogoComponent {}

export const ANGULAR_LOGO = new PolymorpheusComponent(AngularLogoComponent);
