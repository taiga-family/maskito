import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';
import {TuiDocExample} from '@taiga-ui/addon-doc';

import {DocExamplePrimaryTab} from '../../../app/constants';

@Component({
    selector: 'phone-doc',
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
