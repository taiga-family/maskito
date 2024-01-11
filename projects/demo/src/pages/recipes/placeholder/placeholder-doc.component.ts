import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample, TuiDocExampleModule, TuiDocPageModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {PlaceholderDocExample1} from './examples/1-cvc-code/component';
import {PlaceholderDocExample2} from './examples/2-phone/component';
import {PlaceholderDocExample3} from './examples/3-date/component';

@Component({
    standalone: true,
    selector: 'placeholder-doc',
    imports: [
        TuiDocPageModule,
        TuiDocExampleModule,
        TuiLinkModule,
        RouterLink,
        PlaceholderDocExample1,
        PlaceholderDocExample2,
        PlaceholderDocExample3,
    ],
    templateUrl: './placeholder-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    readonly prefixDocPage = `/${DemoPath.Prefix}`;

    readonly cvcExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-cvc-code/mask.ts?raw'
        ),
    };

    readonly phoneExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-phone/mask.ts?raw'),
        [DocExamplePrimaryTab.Angular]: import('./examples/2-phone/component.ts?raw'),
    };

    readonly dateExample3: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-date/mask.ts?raw'),
    };
}
