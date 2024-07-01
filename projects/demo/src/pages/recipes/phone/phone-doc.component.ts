import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {PhoneUSDocExample1} from './examples/1-us-phone/component';
import {PhoneKZDocExample2} from './examples/2-kz-phone/component';

@Component({
    standalone: true,
    selector: 'phone-doc',
    imports: [
        TuiAddonDocModule,
        TuiLink,
        RouterLink,
        PhoneUSDocExample1,
        PhoneKZDocExample2,
    ],
    templateUrl: './phone-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneDocComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly prefixDocPage = `/${DemoPath.Prefix}`;

    protected readonly usPhoneExample1: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-us-phone/mask.ts?raw'
        ),
    };

    protected readonly kzPhoneExample2: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-kz-phone/mask.ts?raw'
        ),
    };
}
