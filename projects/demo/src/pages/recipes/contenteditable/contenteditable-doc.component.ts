import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {ContentEditableDocExample1} from './examples/1-latin/component';

@Component({
    standalone: true,
    selector: 'contenteditable-doc',
    imports: [TuiAddonDocModule, TuiLinkModule, RouterLink, ContentEditableDocExample1],
    templateUrl: './contenteditable-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentEditableDocComponent {
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly maskitoWithContentEditableDemo = import(
        './examples/maskito-with-contenteditable.md?raw'
    );

    readonly contenteditableExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-latin/mask.ts?raw'),
    };
}
