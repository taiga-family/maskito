import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'static',
    templateUrl: './static.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent {}
