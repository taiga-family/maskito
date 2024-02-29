import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

import {PostfixDocExample1} from './examples/1-pattern-mask/component';
import {PostfixDocExample2} from './examples/2-postprocessor/component';

@Component({
    standalone: true,
    selector: 'postfix-doc',
    imports: [
        TuiAddonDocModule,
        TuiNotificationModule,
        TuiLinkModule,
        RouterLink,
        PostfixDocExample1,
        PostfixDocExample2,
    ],
    templateUrl: './postfix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostfixDocComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;

    protected readonly patternMaskApproachExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-pattern-mask/mask.ts?raw'
        ),
    };

    protected readonly postprocessorApproachExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-postprocessor/mask.ts?raw'
        ),
    };
}
