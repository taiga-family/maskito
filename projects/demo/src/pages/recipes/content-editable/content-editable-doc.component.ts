import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {ContentEditableDocExample1} from './examples/1-time/component';
import {ContentEditableDocExample2} from './examples/2-multi-line/component';

@Component({
    standalone: true,
    selector: 'content-editable-doc',
    imports: [
        TuiAddonDocModule,
        TuiLinkModule,
        RouterLink,
        ContentEditableDocExample1,
        ContentEditableDocExample2,
        TuiNotificationModule,
    ],
    templateUrl: './content-editable-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentEditableDocComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly timeMaskDocPage = `/${DemoPath.Time}`;
    protected readonly angularDocPage = `/${DemoPath.Angular}`;
    protected readonly reactDocPage = `/${DemoPath.React}`;
    protected readonly vueDocPage = `/${DemoPath.Vue}`;
    protected readonly maskitoWithContentEditableDemo = import(
        './examples/maskito-with-content-editable.md?raw'
    );

    protected readonly contentEditableExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-time/mask.ts?raw'),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/vanilla-js-tab.md?raw'),
        [DocExamplePrimaryTab.Angular]: import('./examples/1-time/component.ts?raw'),
    };

    protected readonly contentEditableExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-multi-line/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/vanilla-js-tab.md?raw'),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-multi-line/component.ts?raw'
        ),
    };
}
