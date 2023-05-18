import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'plugins-mode-doc-page',
    templateUrl: './plugins.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocPageComponent {
    readonly rejectExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/reject/mask.ts?raw'),
    };
}
