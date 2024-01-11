import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample, TuiDocExampleModule, TuiDocPageModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {OverwriteModeDocExample3} from './examples/dynamic/component';
import {OverwriteModeDocExample2} from './examples/replace/component';
import {OverwriteModeDocExample1} from './examples/shift/component';

@Component({
    standalone: true,
    selector: 'overwrite-mode-doc-page',
    imports: [
        TuiDocPageModule,
        TuiDocExampleModule,
        OverwriteModeDocExample1,
        OverwriteModeDocExample2,
        TuiLinkModule,
        RouterLink,
        OverwriteModeDocExample3,
        NextStepsComponent,
    ],
    templateUrl: './overwrite-mode.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocPageComponent {
    readonly shiftExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/shift/mask.ts?raw'),
    };

    readonly replaceExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/replace/mask.ts?raw'),
    };

    readonly dynamicExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/dynamic/mask.ts?raw'),
    };

    readonly elementStateDocPage = `/${DemoPath.ElementState}`;
}
