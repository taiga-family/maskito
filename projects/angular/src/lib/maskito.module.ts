import {NgModule} from '@angular/core';

import {MaskitoCva} from './maskito.cva';
import {MaskitoDirective} from './maskito.directive';
import {MaskitoPipe} from './maskito.pipe';

@NgModule({
    declarations: [MaskitoDirective, MaskitoCva, MaskitoPipe],
    exports: [MaskitoDirective, MaskitoCva, MaskitoPipe],
})
export class MaskitoModule {}
