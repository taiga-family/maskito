import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'textarea-doc',
    templateUrl: './textarea-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDocComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly maskitoWithTextareaDemo = import('./examples/maskito-with-textarea.md?raw');

    readonly textareaExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-latin/mask.ts?raw'),
    };
}
