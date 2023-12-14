import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'plugins-mode-doc-page',
    templateUrl: './plugins.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocPageComponent {
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
}
