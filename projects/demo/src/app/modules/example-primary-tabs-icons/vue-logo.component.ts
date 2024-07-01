import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgComponent} from '@taiga-ui/legacy';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'vue-logo',
    imports: [TuiSvgComponent],
    template: `
        <tui-svg src="assets/icons/vue.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueLogoComponent {}

export const VUE_LOGO = new PolymorpheusComponent(VueLogoComponent);
