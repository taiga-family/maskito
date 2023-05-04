import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'angular-logo',
    template: `
        <tui-svg src="assets/icons/angular.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularLogoComponent {}

export const ANGULAR_LOGO = new PolymorpheusComponent(AngularLogoComponent);
