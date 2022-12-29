import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'kit-template-doc',
    templateUrl: './kit-template-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitTemplateDocComponent {
    apiPageControl = new FormControl('');

    maskitoOptions: MaskitoOptions = {mask: /^\d+$/};

    generatorOption = false;
}
