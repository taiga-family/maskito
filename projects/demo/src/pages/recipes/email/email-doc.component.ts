import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification, TuiTitle} from '@taiga-ui/core';

import Example1 from './examples/1-basic/component';

@Component({
    selector: 'email-doc',
    imports: [Example1, RouterLink, TuiAddonDoc, TuiLink, TuiNotification, TuiTitle],
    templateUrl: './email-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmailDocComponent {
    protected readonly supportedInputTypesDocPage = `/${DemoPath.SupportedInputTypes}`;

    protected readonly emailExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
