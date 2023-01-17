import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MASKITO_OPTIONS} from '@maskito/angular';
import {maskitoPhoneOptionsGenerator, NO_CYRILLIC_MASK} from './masks';

@Component({
    selector: 'sandbox',
    templateUrl: './sandbox.template.html',
    styleUrls: ['./sandbox.style.less'],
    providers: [{provide: MASKITO_OPTIONS, useValue: {mask: /^@+$/}}],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
    phoneMaskOptions = maskitoPhoneOptionsGenerator('RU');
    noCyrillicMaskOptions = {
        mask: NO_CYRILLIC_MASK,
    };
}
