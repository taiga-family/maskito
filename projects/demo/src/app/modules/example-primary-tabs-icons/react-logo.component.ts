import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgComponent} from '@taiga-ui/legacy';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    standalone: true,
    selector: 'react-logo',
    imports: [TuiSvgComponent],
    template: `
        <tui-svg src="assets/icons/react.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactLogoComponent {}

export const REACT_LOGO = new PolymorpheusComponent(ReactLogoComponent);
