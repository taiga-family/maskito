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
    protected readonly maskitoPublicApiDemo = import(
        './examples/maskito-public-api-demo.md?raw'
    );

    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;
    protected readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    protected readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
    protected readonly transformerDocPage = `/${DemoPath.Transformer}`;
}
