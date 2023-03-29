import {NgModule} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';

import {StackblitzEditButtonComponent} from './stackblitz-edit-button.component';

@NgModule({
    imports: [TuiButtonModule],
    declarations: [StackblitzEditButtonComponent],
    exports: [StackblitzEditButtonComponent],
})
export class StackblitzEditButtonModule {}
