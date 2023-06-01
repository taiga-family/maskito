import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'vue-logo',
    template: `
        <tui-svg src="assets/icons/vue.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueLogoComponent {}

export const VUE_LOGO = new PolymorpheusComponent(VueLogoComponent);
