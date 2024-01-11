import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample, TuiDocExampleModule, TuiDocPageModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {PhoneUSDocExample1} from './examples/1-us-phone/component';
import {PhoneKZDocExample2} from './examples/2-kz-phone/component';

@Component({
    standalone: true,
    selector: 'phone-doc',
    imports: [
        TuiDocPageModule,
        TuiLinkModule,
        RouterLink,
        TuiDocExampleModule,
        PhoneUSDocExample1,
        PhoneKZDocExample2,
    ],
    templateUrl: './phone-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly prefixDocPage = `/${DemoPath.Prefix}`;

    readonly usPhoneExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-us-phone/mask.ts?raw'
        ),
    };

    readonly kzPhoneExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-kz-phone/mask.ts?raw'
        ),
    };
}
