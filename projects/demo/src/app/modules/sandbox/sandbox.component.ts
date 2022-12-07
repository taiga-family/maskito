import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MASKITO_OPTIONS} from '@maskito/angular';
import {
    maskitoNumberOptionsGenerator,
    maskitoPhoneOptionsGenerator,
    NO_CYRILLIC_MASK,
} from './masks';

@Component({
    selector: 'sandbox',
    templateUrl: './sandbox.template.html',
    styleUrls: ['./sandbox.style.less'],
    providers: [{provide: MASKITO_OPTIONS, useValue: {mask: /^@+$/}}],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent {
    phoneMaskOptions = maskitoPhoneOptionsGenerator('RU');
    numberMaskOptions = maskitoNumberOptionsGenerator({
        separator: ',',
        pseudoSeparators: ['.', 'б', 'ю'],
    });
    noCyrillicMaskOptions = {
        mask: NO_CYRILLIC_MASK,
    };
}
