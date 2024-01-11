import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiLinkModule} from '@taiga-ui/core';

import {LogoComponent} from './logo.component';

@NgModule({
    imports: [TuiLinkModule, RouterModule, LogoComponent],
    exports: [LogoComponent],
})
export class LogoModule {}
