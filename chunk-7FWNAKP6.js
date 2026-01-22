import"./chunk-TIC6Q35B.js";var o=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPipe} from '@maskito/angular';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'pipe-doc-example-4',
    imports: [MaskitoPipe],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeDocExample4 {
    protected value = 12345.67;

    protected readonly options = maskitoNumberOptionsGenerator({
        maximumFractionDigits: 2,
    });
}
`;export{o as default};
