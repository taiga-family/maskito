import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import Example1 from './examples/password/component';
import Example2 from './examples/search/component';
import Example3 from './examples/tel/component';
import Example4 from './examples/text/component';
import Example5 from './examples/url/component';

@Component({
    selector: 'supported-input-types-doc-page',
    imports: [
        Example1,
        Example2,
        Example3,
        Example4,
        Example5,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './supported-input-types.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SupportedInputTypesDocPageComponent {
    protected readonly textTypeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/text/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly telTypeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/tel/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly passwordTypeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/password/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly urlTypeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/url/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly searchTypeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/search/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected getInput(type: HTMLInputElement['type']): string {
        return `<input type="${type}" />`;
    }
}
