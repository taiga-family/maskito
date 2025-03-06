import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';

import {PluginsDocExample1} from './examples/1-reject/component';

@Component({
    standalone: true,
    selector: 'kit-plugins-doc',
    imports: [PluginsDocExample1, TuiAddonDoc],
    templateUrl: './kit-plugins-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KitPluginsDocComponent {
    protected readonly rejectExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-reject/mask.ts?raw'),
        'index.less': import('./examples/1-reject/animation.less?raw'),
        'index.ts': import('./examples/1-reject/index.ts?raw'),
    };
}
