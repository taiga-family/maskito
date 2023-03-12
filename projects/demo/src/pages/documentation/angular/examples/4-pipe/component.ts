import {ChangeDetectionStrategy, Component} from '@angular/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'pipe-doc-example-4',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeDocExample4 {
    value = 12345.67;

    readonly options = maskitoNumberOptionsGenerator();
}
