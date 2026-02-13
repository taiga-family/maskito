import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';

import {NetworkAddressDocExample1} from './examples/1-ipv6/component';
import {NetworkAddressDocExample2} from './examples/2-ipv4/component';
import {NetworkAddressDocExample3} from './examples/3-mac/component';

@Component({
    selector: 'network-address-doc',
    imports: [
        NetworkAddressDocExample1,
        NetworkAddressDocExample2,
        NetworkAddressDocExample3,
        TuiAddonDoc,
    ],
    templateUrl: './network-address-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NetworkAddressDocComponent {
    protected readonly ipv6Example1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-ipv6/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly ipv4Example2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-ipv4/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly macExample3: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-mac/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };
}
