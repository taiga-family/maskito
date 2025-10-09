import {I18nPluralPipe} from '@angular/common';
import type {PipeTransform} from '@angular/core';
import {ChangeDetectionStrategy, Component, Pipe} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoInitialCalibrationPlugin} from '@maskito/core';
import {maskitoNumberOptionsGenerator, maskitoParseNumber} from '@maskito/kit';

@Pipe({
    standalone: true,
    name: 'calculateMask',
})
export class TestPipe4 implements PipeTransform {
    public transform(postfix: string): MaskitoOptions {
        const options = maskitoNumberOptionsGenerator({
            postfix,
            maximumFractionDigits: 2,
            thousandSeparator: ' ',
        });

        return {
            ...options,
            plugins: [...options.plugins, maskitoInitialCalibrationPlugin()],
        };
    }
}

@Component({
    selector: 'test-doc-example-4',
    imports: [FormsModule, I18nPluralPipe, MaskitoDirective, TestPipe4],
    template: `
        <input
            placeholder="Enter number"
            [maskito]="parsedValue | i18nPlural: pluralize | calculateMask"
            [(ngModel)]="value"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sandbox {
    protected value = '1 year';

    protected readonly pluralize = {
        '=NaN': '',
        one: ' year',
        few: ' years',
        many: ' years',
        other: ' years',
    };

    protected get parsedValue(): number {
        return maskitoParseNumber(this.value);
    }
}
