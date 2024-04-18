import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DocExamplePrimaryTab} from '@demo/constants';
import type {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {InputPasswordDocExample} from './examples/password/component';
import {InputSearchDocExample} from './examples/search/component';
import {InputTelDocExample} from './examples/tel/component';
import {InputTextDocExample} from './examples/text/component';
import {InputURLDocExample} from './examples/url/component';

@Component({
    standalone: true,
    selector: 'supported-input-types-doc-page',
    imports: [
        RouterLink,
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        InputTextDocExample,
        InputTelDocExample,
        InputPasswordDocExample,
        InputURLDocExample,
        InputSearchDocExample,
    ],
    templateUrl: './supported-input-types.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SupportedInputTypesDocPageComponent {
    protected readonly textTypeExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/text/mask.ts?raw'),
    };

    protected readonly telTypeExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/tel/mask.ts?raw'),
    };

    protected readonly passwordTypeExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/password/mask.ts?raw'),
    };

    protected readonly urlTypeExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/url/mask.ts?raw'),
    };

    protected readonly searchTypeExample: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/search/mask.ts?raw'),
    };

    protected getInput(type: HTMLInputElement['type']): string {
        // eslint-disable-next-line no-irregular-whitespace
        return `<input type="${type}" />`;
    }
}
