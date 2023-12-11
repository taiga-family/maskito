import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiCheckboxLabeledModule, TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'nested-doc-example-2',
    imports: [FormsModule, TuiInputModule, TuiCheckboxLabeledModule],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample2 {
    show = false;
    value = '';
}
