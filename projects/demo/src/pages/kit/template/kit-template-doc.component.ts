import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {
    TuiDocDemoModule,
    TuiDocDocumentationModule,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'kit-template-doc',
    imports: [
        TuiDocPageModule,
        TuiDocExampleModule,
        TuiDocDemoModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
        TuiDocDocumentationModule,
    ],
    templateUrl: './kit-template-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitTemplateDocComponent {
    apiPageControl = new FormControl('');

    maskitoOptions: MaskitoOptions = {mask: /^\d+$/};

    generatorOption = false;
}
