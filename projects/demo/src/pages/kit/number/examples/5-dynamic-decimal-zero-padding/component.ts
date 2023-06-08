/**
 * This example demonstrates Angular way.
 * But this behaviour can be achieved via vanilla JavaScript too
 * (it just requires more code).
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {tuiPure} from '@taiga-ui/cdk';

import {getMaskitoOptions} from './mask';

@Component({
    selector: 'number-mask-doc-example-5',
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
                    [maskito]="getMaskOptions(decimalZeroPadding)"
                    (beforeinput.capture)="handleBeforeInput($event)"
                />
            </tui-input>
        </label>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample5 {
    value = '42';
    decimalZeroPadding = this.value.includes('.');

    @tuiPure // Decorator for memoization
    getMaskOptions(decimalZeroPadding: boolean): MaskitoOptions {
        return getMaskitoOptions(decimalZeroPadding);
    }

    handleBeforeInput(event: Event): void {
        const {inputType, target, data} = event as InputEvent;

        if (inputType.includes('delete')) {
            const element = target as HTMLInputElement;
            const [from, to] = this.getNotEmptySelection(
                [element.selectionStart || 0, element.selectionEnd || 0],
                inputType.includes('Forward'),
            );
            const dotWasRemoved = this.value.slice(from, to).includes('.');

            this.decimalZeroPadding = this.decimalZeroPadding && !dotWasRemoved;
        } else {
            this.decimalZeroPadding = ['.', ',', 'б', 'ю'].some(
                sep => data?.includes(sep) || this.value.includes(sep),
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
