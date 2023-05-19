import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiLinkModule} from '@taiga-ui/core';

import {NextStepsComponent} from './next-steps.component';

@NgModule({
    imports: [TuiLinkModule, RouterModule],
    declarations: [NextStepsComponent],
    exports: [NextStepsComponent],
})
export class NextStepsModule {}
