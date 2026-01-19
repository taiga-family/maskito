import {I18nPluralPipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    model,
    Pipe,
    type PipeTransform,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoInitialCalibrationPlugin} from '@maskito/core';
import {maskitoNumberOptionsGenerator, maskitoParseNumber} from '@maskito/kit';

@Pipe({
    name: 'calculateMask',
})
export class TestPipe4 implements PipeTransform {
    public transform(postfix: string): MaskitoOptions {
        const options = maskitoNumberOptionsGenerator({
            postfix,
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
            [maskito]="parsedValue() | i18nPlural: pluralize() | calculateMask"
            [(ngModel)]="value"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sandbox {
    protected readonly value = model('');
    protected readonly parsedValue = computed(() => maskitoParseNumber(this.value()));

    protected readonly pluralize = input({
        '=NaN': '',
        one: ' year',
        few: ' years',
        many: ' years',
        other: ' years',
    });
}
