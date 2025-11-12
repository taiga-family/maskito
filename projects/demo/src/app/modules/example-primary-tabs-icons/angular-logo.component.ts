import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'angular-logo',
    template: '<img src="assets/icons/angular.svg" />',
    styles: ['img {display: flex; width: 1.5rem}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularLogoComponent {}

export const ANGULAR_LOGO = new PolymorpheusComponent(AngularLogoComponent);
