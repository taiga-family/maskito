import {NgModule} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

import {AngularLogoComponent} from './angular-logo.component';
import {JavaScriptLogoComponent} from './javascript-logo.component';
import {ReactLogoComponent} from './react-logo.component';

@NgModule({
    imports: [TuiSvgModule],
    declarations: [JavaScriptLogoComponent, AngularLogoComponent, ReactLogoComponent],
    exports: [JavaScriptLogoComponent, AngularLogoComponent, ReactLogoComponent],
})
export class DocExamplePrimaryTabsIconsModule {}
