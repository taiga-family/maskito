import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiLabel} from '@taiga-ui/core';
import {TuiCheckbox} from '@taiga-ui/kit';
import {TuiInputModule} from '@taiga-ui/legacy';

@Component({
    selector: 'nested-doc-example-2',
    imports: [FormsModule, TuiCheckbox, TuiInputModule, TuiLabel],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample2 {
    protected show = false;
    protected value = '';
}
