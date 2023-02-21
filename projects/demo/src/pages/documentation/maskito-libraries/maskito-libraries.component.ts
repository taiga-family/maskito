import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';

@Component({
    selector: 'maskito-libraries-doc-page',
    templateUrl: './maskito-libraries.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskitoLibrariesDocPageComponent {
    readonly numberMaskDocPage = `/${DemoPath.Number}`;
    readonly timeMaskDocPage = `/${DemoPath.Time}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly angularDocPage = `/${DemoPath.Angular}`;
}
