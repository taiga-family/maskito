import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {TextareaDocExample1} from './examples/1-latin/component';

@Component({
    selector: 'textarea-doc',
    imports: [RouterLink, TextareaDocExample1, TuiAddonDoc, TuiLink],
    templateUrl: './textarea-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextareaDocComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly maskitoWithTextareaDemo =
        import('./examples/maskito-with-textarea.md');

    protected readonly textareaExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-latin/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
