import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoCVA, MaskitoDirective} from '@maskito/angular';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    standalone: true,
    selector: 'cva-doc-example-3',
    imports: [
        MaskitoDirective,
        MaskitoCVA, // <--- Don't forget to import it
        ReactiveFormsModule,
    ],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvaDocExample3 {
    readonly control = new FormControl('');

    readonly maskito = maskitoNumberOptionsGenerator({precision: 2});

    setValue(): void {
        this.control.setValue(
            '12345.6789', // This value will be formatted to "12 345.67"
        );
    }
}
