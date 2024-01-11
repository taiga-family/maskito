import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    standalone: true,
    selector: 'react-logo',
    imports: [TuiSvgModule],
    template: `
        <tui-svg src="assets/icons/react.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactLogoComponent {}

export const REACT_LOGO = new PolymorpheusComponent(ReactLogoComponent);
