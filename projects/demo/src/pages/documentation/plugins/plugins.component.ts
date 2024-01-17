import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {PluginsDocExample1} from './examples/1-reject/component';
import {PluginsDocExample2} from './examples/2-initial-calibration/component';
import {PluginsDocExample3} from './examples/3-strict-composition/component';

@Component({
    standalone: true,
    selector: 'plugins-mode-doc-page',
    imports: [
        RouterLink,
        TuiAddonDocModule,
        TuiNotificationModule,
        TuiLinkModule,
        NextStepsComponent,
        PluginsDocExample1,
        PluginsDocExample2,
        PluginsDocExample3,
    ],
    templateUrl: './plugins.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PluginsDocPageComponent {
    readonly transformerDocPage = `/${DemoPath.Transformer}`;

    readonly rejectExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-reject/mask.ts?raw'),
        'index.less': import('./examples/1-reject/animation.less?raw'),
        'index.ts': import('./examples/1-reject/index.ts?raw'),
    };

    readonly initialCalibrationExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-initial-calibration/mask.ts?raw'
        ),
        'index.ts': import('./examples/2-initial-calibration/index.ts?raw'),
    };

    readonly strictCompositionExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-strict-composition/mask.ts?raw'
        ),
    };
}
