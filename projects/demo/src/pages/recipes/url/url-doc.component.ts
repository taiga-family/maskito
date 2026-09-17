import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';

import Example1 from './examples/1-basic/component';

@Component({
    selector: 'url-doc',
    imports: [Example1, TuiAddonDoc],
    templateUrl: './url-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UrlDocComponent {
    protected readonly urlExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
