import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'lazy',
    templateUrl: './lazy.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyComponent {}
