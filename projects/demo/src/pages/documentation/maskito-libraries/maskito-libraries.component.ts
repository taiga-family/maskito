import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiDocCodeModule, TuiDocPageModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'maskito-libraries-doc-page',
    imports: [
        TuiDocPageModule,
        TuiNotificationModule,
        TuiDocCodeModule,
        TuiLinkModule,
        RouterLink,
    ],
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
