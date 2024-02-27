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
    protected readonly numberMaskDocPage = `/${DemoPath.Number}`;
    protected readonly phoneMaskDocPage = `/${DemoPath.PhonePackage}`;
    protected readonly timeMaskDocPage = `/${DemoPath.Time}`;
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly angularDocPage = `/${DemoPath.Angular}`;
    protected readonly reactDocPage = `/${DemoPath.React}`;
    protected readonly vueDocPage = `/${DemoPath.Vue}`;
}
