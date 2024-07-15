import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {OverwriteModeDocExample3} from './examples/dynamic/component';
import {OverwriteModeDocExample2} from './examples/replace/component';
import {OverwriteModeDocExample1} from './examples/shift/component';

@Component({
    standalone: true,
    selector: 'overwrite-mode-doc-page',
    imports: [
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        NextStepsComponent,
        OverwriteModeDocExample1,
        OverwriteModeDocExample2,
        OverwriteModeDocExample3,
    ],
    templateUrl: './overwrite-mode.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OverwriteModeDocPageComponent {
    protected readonly shiftExample: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/shift/mask.ts?raw'),
    };

    protected readonly replaceExample: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/replace/mask.ts?raw'),
    };

    protected readonly dynamicExample: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/dynamic/mask.ts?raw'),
    };

    protected readonly elementStateDocPage = `/${DemoPath.ElementState}`;
}
