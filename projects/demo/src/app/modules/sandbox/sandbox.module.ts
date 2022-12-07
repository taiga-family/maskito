import {NgModule} from '@angular/core';
import {MaskitoModule} from '@maskito/angular';

import {SandboxComponent} from './sandbox.component';

@NgModule({
    declarations: [SandboxComponent],
    imports: [MaskitoModule],
    exports: [SandboxComponent],
})
export class SandboxModule {}
