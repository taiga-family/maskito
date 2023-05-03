import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
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
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-latin/mask.ts?raw'),
    };
}
