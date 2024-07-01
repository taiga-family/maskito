import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgComponent} from '@taiga-ui/legacy';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'angular-logo',
    imports: [TuiSvgComponent],
    template: `
        <tui-svg src="assets/icons/angular.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularLogoComponent {}

export const ANGULAR_LOGO = new PolymorpheusComponent(AngularLogoComponent);
