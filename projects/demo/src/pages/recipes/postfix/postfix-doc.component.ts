import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {PostfixDocExample1} from './examples/1-pattern-mask/component';
import {PostfixDocExample2} from './examples/2-postprocessor/component';

@Component({
    standalone: true,
    selector: 'postfix-doc',
    imports: [
        TuiAddonDocModule,
        TuiNotification,
        TuiLink,
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

    protected readonly patternMaskApproachExample1: Record<
        string,
        Promise<unknown> | string
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-pattern-mask/mask.ts?raw'
        ),
    };

    protected readonly postprocessorApproachExample2: Record<
        string,
        Promise<unknown> | string
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-postprocessor/mask.ts?raw'
        ),
    };
}
