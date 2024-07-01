import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiLabelComponent} from '@taiga-ui/core';
import {TuiCheckboxComponent} from '@taiga-ui/kit';
import {TuiInputModule} from '@taiga-ui/legacy';

@Component({
    standalone: true,
    selector: 'nested-doc-example-2',
    imports: [FormsModule, TuiInputModule, TuiLabelComponent, TuiCheckboxComponent],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedDocExample2 {
    protected show = false;
    protected value = '';
}
