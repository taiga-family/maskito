import"./chunk-TIC6Q35B.js";var o=`/**
 * This example demonstrates Angular way.
 * But this behaviour can be achieved via vanilla JavaScript too
 * (it just requires more code).
 */
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiLabel} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {getMaskitoOptions} from './mask';

@Component({
    selector: 'number-mask-doc-example-7',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiLabel,
        TuiTextfieldControllerModule,
    ],
    template: \`
        <label tuiLabel>
            Enable decimal zero padding by typing dot
            <tui-input
                [style.max-width.rem]="30"
                [tuiTextfieldLabelOutside]="true"
                [(ngModel)]="value"
            >
                <input
                    inputmode="decimal"
                    tuiTextfieldLegacy
                    [maskito]="getMaskOptions(decimalZeroPadding)"
                    (beforeinput.capture)="handleBeforeInput($event)"
                />
            </tui-input>
        </label>
    \`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample7 {
    protected value = '42';
    protected decimalZeroPadding = this.value.includes('.');

    @tuiPure // Decorator for memoization
    protected getMaskOptions(decimalZeroPadding: boolean): MaskitoOptions {
        return getMaskitoOptions(decimalZeroPadding);
    }

    protected handleBeforeInput(event: Event): void {
        const {inputType, target, data} = event as InputEvent;

        if (inputType.includes('delete')) {
            const element = target as HTMLInputElement;
            const [from, to] = this.getNotEmptySelection(
                [element.selectionStart ?? 0, element.selectionEnd ?? 0],
                inputType.includes('Forward'),
            );
            const dotWasRemoved = this.value.slice(from, to).includes('.');

            this.decimalZeroPadding = this.decimalZeroPadding && !dotWasRemoved;
        } else {
            this.decimalZeroPadding = ['.', ',', '\u0431', '\u044E'].some(
                (sep) => data?.includes(sep) || this.value.includes(sep),
            );
        }
    }

    private getNotEmptySelection(
        [from, to]: [number, number],
        isForward: boolean,
    ): [number, number] {
        if (from !== to) {
            return [from, to];
        }

        return isForward ? [from, to + 1] : [Math.max(from - 1, 0), to];
    }
}
`;export{o as default};
