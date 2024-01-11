import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'vue-logo',
    imports: [TuiSvgModule],
    template: `
        <tui-svg src="assets/icons/vue.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueLogoComponent {}

export const VUE_LOGO = new PolymorpheusComponent(VueLogoComponent);
