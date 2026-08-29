import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';

import Example1 from './examples/1-basic/component';

@Component({
    selector: 'email-doc',
    imports: [Example1, TuiAddonDoc],
    templateUrl: './email-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmailDocComponent {
    protected readonly emailExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
