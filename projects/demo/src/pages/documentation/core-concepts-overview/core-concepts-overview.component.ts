import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiIslandModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'core-concepts-overview-doc-page',
    imports: [
        TuiAddonDocModule,
        TuiLinkModule,
        TuiNotificationModule,
        TuiIslandModule,
        RouterLink,
    ],
    templateUrl: './core-concepts-overview.template.html',
    styleUrls: ['./core-concepts-overview.styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoreConceptsOverviewDocPageComponent {
    readonly maskitoPublicApiDemo = import('./examples/maskito-public-api-demo.md?raw');
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
    readonly transformerDocPage = `/${DemoPath.Transformer}`;
}
