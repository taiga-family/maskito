import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {PrefixDocExample1} from './examples/1-pattern-mask/component';
import {PrefixDocExample2} from './examples/2-postprocessor/component';

@Component({
    selector: 'prefix-doc',
    imports: [
        PrefixDocExample1,
        PrefixDocExample2,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './prefix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrefixDocComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;

    protected readonly patternMaskApproachExample1: Record<string, TuiRawLoaderContent> =
        {
            [DocExamplePrimaryTab.MaskitoOptions]: import(
                './examples/1-pattern-mask/mask.ts?raw',
                {with: {loader: 'text'}}
            ),
        };

    protected readonly postprocessorApproachExample2: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-postprocessor/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };
}
