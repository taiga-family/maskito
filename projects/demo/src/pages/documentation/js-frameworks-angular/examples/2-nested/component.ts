import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'nested-doc-example-2',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample2 {
    show = false;
    value = '';
}
