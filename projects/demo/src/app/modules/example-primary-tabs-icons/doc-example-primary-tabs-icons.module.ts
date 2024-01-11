import {NgModule} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

import {AngularLogoComponent} from './angular-logo.component';
import {JavaScriptLogoComponent} from './javascript-logo.component';
import {ReactLogoComponent} from './react-logo.component';
import {VueLogoComponent} from './vue-logo.component';

@NgModule({
    imports: [
        TuiSvgModule,
        JavaScriptLogoComponent,
        AngularLogoComponent,
        ReactLogoComponent,
        VueLogoComponent,
    ],
    exports: [
        JavaScriptLogoComponent,
        AngularLogoComponent,
        ReactLogoComponent,
        VueLogoComponent,
    ],
})
export class DocExamplePrimaryTabsIconsModule {}
