import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiSurface, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';

import {NextStepsComponent} from '../next-steps/next-steps.component';
import {PluginsDocExample2} from './examples/1-initial-calibration/component';
import {PluginsDocExample3} from './examples/2-strict-composition/component';
import {PluginsDocExample4} from './examples/3-change-event/component';
import documentationMask from './examples/pads-zero-plugin';

@Component({
    selector: 'plugins-mode-doc-page',
    imports: [
        FormsModule,
        MaskitoDirective,
        NextStepsComponent,
        PluginsDocExample2,
        PluginsDocExample3,
        PluginsDocExample4,
        RouterLink,
        TuiAddonDoc,
        TuiCardLarge,
        TuiHeader,
        TuiLink,
        TuiSurface,
        TuiTextfield,
        TuiTitle,
    ],
    templateUrl: './plugins.template.html',
    styleUrl: './plugins.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PluginsDocPageComponent {
    protected readonly transformerDocPage = `/${DemoPath.Transformer}`;
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly kitPluginsDocPage = `/${DemoPath.KitPlugins}`;
    protected readonly documentationMask = documentationMask;

    protected readonly oversimplifiedNumberMask = import(
        './examples/oversimplified-number-mask.md?raw'
    );

    protected readonly padsZeroPlugin = import('./examples/pads-zero-plugin.ts?raw');

    protected readonly initialCalibrationExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-initial-calibration/mask.ts?raw'
        ),
        'index.ts': import('./examples/1-initial-calibration/index.ts?raw'),
    };

    protected readonly strictCompositionExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-strict-composition/mask.ts?raw'
        ),
    };

    protected readonly changeEventExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-change-event/mask.ts?raw'
        ),
    };
}
