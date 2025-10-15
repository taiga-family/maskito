import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {CardDocExample1} from './examples/1-basic/component';

@Component({
    selector: 'card-doc',
    imports: [CardDocExample1, RouterLink, TuiAddonDoc, TuiLink],
    templateUrl: './card-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardDocComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly dateMaskDocPage = `/${DemoPath.Date}`;

    protected readonly cardExample1: Record<string, TuiRawLoaderContent> = {
        TypeScript: import('./examples/1-basic/component.ts?raw', {
            with: {loader: 'text'},
        }),
        HTML: import('./examples/1-basic/template.html'),
    };
}
