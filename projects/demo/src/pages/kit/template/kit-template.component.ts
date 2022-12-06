import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'kit-template',
    templateUrl: './kit-template.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitTemplateComponent {
    generatorOption = false;
}
