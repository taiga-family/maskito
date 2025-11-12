import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'react-logo',
    template: '<img src="assets/icons/react.svg" />',
    styles: ['img {display: flex; width: 1.5rem}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactLogoComponent {}

export const REACT_LOGO = new PolymorpheusComponent(ReactLogoComponent);
