import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'kit-template',
    templateUrl: './kit-template.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitTemplateComponent {
    maskitoOptions: MaskitoOptions = {mask: /^\d+$/};

    generatorOption = false;
}
