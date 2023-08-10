import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';

@Component({
    selector: 'maskito-libraries-doc-page',
    templateUrl: './maskito-libraries.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskitoLibrariesDocPageComponent {
    readonly numberMaskDocPage = `/${DemoPath.Number}`;
    readonly phoneMaskDocPage = `/${DemoPath.PhonePackage}`;
    readonly timeMaskDocPage = `/${DemoPath.Time}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly angularDocPage = `/${DemoPath.Angular}`;
    readonly reactDocPage = `/${DemoPath.React}`;
    readonly vueDocPage = `/${DemoPath.Vue}`;
}
