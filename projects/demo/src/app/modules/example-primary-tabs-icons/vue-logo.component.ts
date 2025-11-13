import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'vue-logo',
    template: '<img src="assets/icons/vue.svg" />',
    styles: ['img {display: flex; width: 1.5rem}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueLogoComponent {}

export const VUE_LOGO = new PolymorpheusComponent(VueLogoComponent);
