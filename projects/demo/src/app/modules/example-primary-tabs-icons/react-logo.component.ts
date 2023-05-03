import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'react-logo',
    template: `
        <tui-svg src="/assets/icons/react.svg"></tui-svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactLogoComponent {}

export const REACT_LOGO = new PolymorpheusComponent(ReactLogoComponent);
