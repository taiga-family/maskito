import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/routes';

@Component({
    selector: 'core-concepts-overview-doc-page',
    templateUrl: './core-concepts-overview.template.html',
    styleUrls: ['./core-concepts-overview.styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreConceptsOverviewDocPageComponent {
    readonly maskitoPublicApiDemo = import('./examples/maskito-public-api-demo.md?raw');
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
