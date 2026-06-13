import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';

import {RtlDocExample1} from './examples/1-date-placeholder';
import {RtlDocExample2} from './examples/2-phone-placeholder';

@Component({
    selector: 'rtl-doc',
    imports: [RtlDocExample1, RtlDocExample2, TuiAddonDoc],
    templateUrl: './rtl-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RtlDocComponent {
    protected readonly datePlaceholderExample1: Record<string, TuiRawLoaderContent> = {
        HTML: import('./examples/1-date-placeholder/index.html'),
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-date-placeholder/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        'with-bidi-isolation.ts': import(
            './examples/1-date-placeholder/with-bidi-isolation.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly phonePlaceholderExample2: Record<string, TuiRawLoaderContent> = {
        HTML: import('./examples/2-phone-placeholder/index.html'),
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-phone-placeholder/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        'with-bidi-isolation.ts': import(
            './examples/1-date-placeholder/with-bidi-isolation.ts?raw',
            {with: {loader: 'text'}}
        ),
    };
}
