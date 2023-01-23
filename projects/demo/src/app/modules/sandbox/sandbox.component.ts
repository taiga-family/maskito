import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';

import {maskitoPhoneOptionsGenerator, NO_CYRILLIC_MASK} from './masks';

@Component({
    selector: 'sandbox',
    templateUrl: './sandbox.template.html',
    styleUrls: ['./sandbox.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
    dummyMask: MaskitoOptions = {mask: /^@+$/};

    phoneMaskOptions = maskitoPhoneOptionsGenerator('RU');
    noCyrillicMaskOptions = {
        mask: NO_CYRILLIC_MASK,
    };
}
