import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {
    TuiDocCodeModule,
    TuiDocExample,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {TextareaDocExample1} from './examples/1-latin/component';

@Component({
    standalone: true,
    selector: 'textarea-doc',
    imports: [
        TuiDocPageModule,
        TuiDocCodeModule,
        TuiLinkModule,
        RouterLink,
        TuiDocExampleModule,
        TextareaDocExample1,
    ],
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
