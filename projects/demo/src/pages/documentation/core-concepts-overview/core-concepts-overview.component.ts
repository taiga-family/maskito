import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'core-concepts-overview-doc-page',
    templateUrl: './core-concepts-overview.template.html',
    styleUrls: ['./core-concepts-overview.styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreConceptsOverviewDocPageComponent {
    readonly maskitoPublicApiDemo = import('./examples/maskito-public-api-demo.md?raw');
}
