import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'cva-doc-example-3',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvaDocExample3 {
    readonly control = new FormControl();

    readonly maskito = maskitoNumberOptionsGenerator();

    setValue(): void {
        this.control.setValue(12345.67);
    }
}
