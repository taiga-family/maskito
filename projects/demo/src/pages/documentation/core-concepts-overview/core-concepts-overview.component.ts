import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification, TuiTooltip} from '@taiga-ui/core';
import {TuiIslandDirective} from '@taiga-ui/legacy';

@Component({
    standalone: true,
    selector: 'core-concepts-overview-doc-page',
    imports: [
        TuiAddonDoc,
        TuiLink,
        TuiNotification,
        TuiIslandDirective,
        TuiTooltip,
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
    protected readonly supportedInputTypesDocPage = `/${DemoPath.SupportedInputTypes}`;
}
