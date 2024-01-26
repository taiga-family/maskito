import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {PrefixDocExample1} from './examples/1-pattern-mask/component';
import {PrefixDocExample2} from './examples/2-postprocessor/component';

@Component({
    standalone: true,
    selector: 'prefix-doc',
    imports: [
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        RouterLink,
        PrefixDocExample1,
        PrefixDocExample2,
    ],
    templateUrl: './prefix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrefixDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;

    readonly patternMaskApproachExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-pattern-mask/mask.ts?raw'
        ),
    };

    readonly postprocessorApproachExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-postprocessor/mask.ts?raw'
        ),
    };
}
