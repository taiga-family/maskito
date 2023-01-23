/**
 * This example demonstrates Angular way.
 * But this behaviour can be achieved via vanilla Javascript too
 * (it just requires more code).
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {tuiPure} from '@taiga-ui/cdk';

import {getMaskitoOptions} from './mask';

@Component({
    selector: 'number-mask-doc-example-4',
    template: `
        <label tuiLabel="Enable decimal zero padding by typing dot">
            <tui-input
                [tuiTextfieldLabelOutside]="true"
                [style.max-width.rem]="30"
                [(ngModel)]="value"
            >
                <input
                    tuiTextfield
                    inputmode="decimal"
                    [maskito]="getMaskOptions(value.includes('.'))"
                />
            </tui-input>
        </label>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample4 {
    value = '42';

    @tuiPure // Decorator for memoization
    getMaskOptions(decimalZeroPadding: boolean): MaskitoOptions {
        return getMaskitoOptions(decimalZeroPadding);
    }
}
