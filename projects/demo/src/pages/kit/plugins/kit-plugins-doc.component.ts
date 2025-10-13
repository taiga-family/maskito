import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';
import {TuiLink, TuiNotification} from '@taiga-ui/core';

import {KitPluginsDocExample1} from './examples/1-selection-handler/component';
import {KitPluginsDocExample2} from './examples/2-caret-guard/component';
import {KitPluginsDocExample3} from './examples/3-event-handlers/component';
import {KitPluginsDocExample4} from './examples/4-reject/component';

@Component({
    selector: 'kit-plugins-doc',
    imports: [
        KitPluginsDocExample1,
        KitPluginsDocExample2,
        KitPluginsDocExample3,
        KitPluginsDocExample4,
        RouterLink,
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './kit-plugins-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KitPluginsDocComponent {
    protected readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    protected readonly isMobile = inject(TUI_IS_MOBILE);

    protected readonly selectionChangeHandlerExample: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-selection-handler/mask.ts?raw'
        ),
    };

    protected readonly caretGuardExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-caret-guard/mask.ts?raw'
        ),
    };

    protected readonly eventHandlersExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-event-handlers/mask.ts?raw'
        ),
    };

    protected readonly rejectExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/4-reject/mask.ts?raw'),
        'index.less': import('./examples/4-reject/animation.less'),
        'index.ts': import('./examples/4-reject/index.ts?raw'),
    };
}
