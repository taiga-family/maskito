import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {ContentEditableDocExample1} from './examples/1-time/component';

@Component({
    standalone: true,
    selector: 'content-editable-doc',
    imports: [TuiAddonDocModule, TuiLinkModule, RouterLink, ContentEditableDocExample1],
    templateUrl: './content-editable-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentEditableDocComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly timeMaskDocPage = `/${DemoPath.Time}`;
    protected readonly maskitoWithContentEditableDemo = import(
        './examples/maskito-with-content-editable.md?raw'
    );

    protected readonly contentEditableExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-time/mask.ts?raw'),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/1-time/vanilla-js.ts?raw'),
        [DocExamplePrimaryTab.Angular]: import('./examples/1-time/component.ts?raw'),
    };
}
