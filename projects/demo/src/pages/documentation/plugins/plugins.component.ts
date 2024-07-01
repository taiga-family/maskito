import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {PluginsDocExample1} from './examples/1-reject/component';
import {PluginsDocExample2} from './examples/2-initial-calibration/component';
import {PluginsDocExample3} from './examples/3-strict-composition/component';
import {PluginsDocExample4} from './examples/4-change-event/component';

@Component({
    standalone: true,
    selector: 'plugins-mode-doc-page',
    imports: [
        RouterLink,
        TuiAddonDoc,
        TuiNotification,
        TuiLink,
        NextStepsComponent,
        PluginsDocExample1,
        PluginsDocExample2,
        PluginsDocExample3,
        PluginsDocExample4,
    ],
    templateUrl: './plugins.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PluginsDocPageComponent {
    protected readonly transformerDocPage = `/${DemoPath.Transformer}`;

    protected readonly rejectExample: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-reject/mask.ts?raw'),
        'index.less': import('./examples/1-reject/animation.less?raw'),
        'index.ts': import('./examples/1-reject/index.ts?raw'),
    };

    protected readonly initialCalibrationExample: Record<
        string,
        Promise<unknown> | string
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-initial-calibration/mask.ts?raw'
        ),
        'index.ts': import('./examples/2-initial-calibration/index.ts?raw'),
    };

    protected readonly strictCompositionExample: Record<
        string,
        Promise<unknown> | string
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-strict-composition/mask.ts?raw'
        ),
    };

    protected readonly changeEventExample: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-change-event/mask.ts?raw'
        ),
    };
}
