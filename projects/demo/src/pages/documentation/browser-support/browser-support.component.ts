import {NgFor, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiDocPageModule} from '@taiga-ui/addon-doc';

@Component({
    standalone: true,
    selector: 'browser-support',
    imports: [TuiDocPageModule, NgFor, NgIf],
    templateUrl: './browser-support.template.html',
    styles: ['td {width: 18.75rem}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserSupportComponent {
    readonly desktopBrowsers = [
        {name: 'Google Chrome', version: '74+'},
        {name: 'Mozilla Firefox', version: '87+'},
        {name: 'Safari', version: '12.1+'},
        {name: 'Opera', version: '62+'},
        {name: 'Edge (Chromium)', version: '74+'},
        {name: 'Microsoft Internet Explorer', version: null},
        {name: 'Edge (EdgeHTML)', version: null},
    ] as const;

    readonly mobileBrowsers = [
        {name: 'Google Chrome', version: '90+'},
        {name: 'Mozilla Firefox', version: '99+'},
        {name: 'Safari', version: '12.2+'},
        {name: 'Opera', version: '64+'},
    ];
}
