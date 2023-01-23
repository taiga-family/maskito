import {NgModule} from '@angular/core';

import {MaskitoDirective} from './maskito.directive';
import {MaskitoOptionsDirective} from './maskito-options.directive';

@NgModule({
    declarations: [MaskitoDirective, MaskitoOptionsDirective],
    exports: [MaskitoDirective, MaskitoOptionsDirective],
})
export class MaskitoModule {}
