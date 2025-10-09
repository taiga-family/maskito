import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TuiLink} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

@Component({
    selector: 'logo',
    imports: [RouterLink, TuiLink],
    templateUrl: './logo.template.html',
    styleUrl: './logo.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}

export const LOGO_CONTENT = new PolymorpheusComponent(LogoComponent);
