import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {OverwriteModeDocExample3} from './examples/dynamic/component';
import {OverwriteModeDocExample2} from './examples/replace/component';
import {OverwriteModeDocExample1} from './examples/shift/component';

@Component({
    selector: 'overwrite-mode-doc-page',
    imports: [
        NextStepsComponent,
        OverwriteModeDocExample1,
        OverwriteModeDocExample2,
        OverwriteModeDocExample3,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
    ],
    templateUrl: './overwrite-mode.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OverwriteModeDocPageComponent {
    protected readonly shiftExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/shift/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly replaceExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/replace/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly dynamicExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/dynamic/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly elementStateDocPage = `/${DemoPath.ElementState}`;
}
