import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'maskito-libraries-doc-page',
    imports: [TuiAddonDocModule, TuiNotificationModule, TuiLinkModule, RouterLink],
    templateUrl: './maskito-libraries.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaskitoLibrariesDocPageComponent {
    readonly numberMaskDocPage = `/${DemoPath.Number}`;
    readonly phoneMaskDocPage = `/${DemoPath.PhonePackage}`;
    readonly timeMaskDocPage = `/${DemoPath.Time}`;
    readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly angularDocPage = `/${DemoPath.Angular}`;
    readonly reactDocPage = `/${DemoPath.React}`;
    readonly vueDocPage = `/${DemoPath.Vue}`;
}
