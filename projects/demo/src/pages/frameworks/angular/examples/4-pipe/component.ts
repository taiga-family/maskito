import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPipe} from '@maskito/angular';
import {maskitoNumber} from '@maskito/kit';

@Component({
    selector: 'pipe-doc-example-4',
    imports: [MaskitoPipe],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeDocExample4 {
    protected value = 12345.67;
    protected readonly options = maskitoNumber({maximumFractionDigits: 2});
}
