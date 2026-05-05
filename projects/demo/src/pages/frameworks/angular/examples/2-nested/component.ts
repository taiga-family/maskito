import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiCheckbox, TuiInput, TuiLabel} from '@taiga-ui/core';

@Component({
    selector: 'nested-doc-example-2',
    imports: [FormsModule, TuiCheckbox, TuiInput, TuiLabel],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample2 {
    protected show = false;
    protected value = '';
}
