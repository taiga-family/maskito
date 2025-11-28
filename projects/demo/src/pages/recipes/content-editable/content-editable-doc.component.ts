import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {ContentEditableDocExample1} from './examples/1-time/component';
import {ContentEditableDocExample2} from './examples/2-multi-line/component';

@Component({
    selector: 'content-editable-doc',
    imports: [
        ContentEditableDocExample1,
        ContentEditableDocExample2,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
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
    protected readonly maskitoWithContentEditableDemo =
        import('./examples/maskito-with-content-editable.md');

    protected readonly contentEditableExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-time/mask.ts?raw', {
            with: {loader: 'text'},
        }),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/vanilla-js-tab.md'),
        [DocExamplePrimaryTab.Angular]: import('./examples/1-time/component.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly contentEditableExample2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-multi-line/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/vanilla-js-tab.md'),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-multi-line/component.ts?raw',
            {with: {loader: 'text'}}
        ),
    };
}
