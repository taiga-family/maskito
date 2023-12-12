import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPipe} from '@maskito/angular';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    standalone: true,
    selector: 'pipe-doc-example-4',
    imports: [MaskitoPipe],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeDocExample4 {
    value = 12345.67;

    readonly options = maskitoNumberOptionsGenerator({precision: 2});
}
