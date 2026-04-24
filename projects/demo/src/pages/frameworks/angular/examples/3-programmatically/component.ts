import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoNumber} from '@maskito/kit';

@Component({
    selector: 'programmatically-doc-example-3',
    imports: [MaskitoDirective, ReactiveFormsModule],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammaticallyDocExample3 {
    protected readonly control = new FormControl('');
    protected readonly maskito = maskitoNumber({maximumFractionDigits: 2});

    protected setValue(): void {
        this.control.setValue(
            '12345.6789', // This value will be formatted to "12 345.67"
        );
    }
}
