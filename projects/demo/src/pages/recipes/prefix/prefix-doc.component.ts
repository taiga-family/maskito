import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {PrefixDocExample1} from './examples/1-pattern-mask/component';
import {PrefixDocExample2} from './examples/2-postprocessor/component';

@Component({
    standalone: true,
    selector: 'prefix-doc',
    imports: [
        TuiAddonDocModule,
        TuiLink,
        TuiNotification,
        RouterLink,
        PrefixDocExample1,
        PrefixDocExample2,
    ],
    templateUrl: './prefix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrefixDocComponent {
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
