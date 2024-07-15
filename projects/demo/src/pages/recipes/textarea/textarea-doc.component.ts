import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {TextareaDocExample1} from './examples/1-latin/component';

@Component({
    standalone: true,
    selector: 'textarea-doc',
    imports: [TuiAddonDoc, TuiLink, RouterLink, TextareaDocExample1],
    templateUrl: './textarea-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextareaDocComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly maskitoWithTextareaDemo = import(
        './examples/maskito-with-textarea.md?raw'
    );

    protected readonly textareaExample1: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-latin/mask.ts?raw'),
    };
}
