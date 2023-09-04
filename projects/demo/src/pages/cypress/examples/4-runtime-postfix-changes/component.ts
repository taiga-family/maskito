import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Pipe,
    PipeTransform,
    ViewChild,
} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator, maskitoParseNumber} from '@maskito/kit';

@Pipe({
    name: 'calculateMask',
})
export class TestPipe4 implements PipeTransform {
    transform(postfix: string): MaskitoOptions {
        return maskitoNumberOptionsGenerator({
            postfix,
            precision: 2,
            thousandSeparator: ' ',
        });
    }
}

@Component({
    selector: 'test-doc-example-4',
    template: `
        <input
            #inputRef
            placeholder="Enter number"
            value="1 year"
            [maskito]="parsedValue | i18nPlural: pluralize | calculateMask"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample4 {
    @ViewChild('inputRef', {read: ElementRef, static: true})
    readonly inputRef!: ElementRef<HTMLInputElement>;

    get parsedValue(): number {
        return maskitoParseNumber(this.inputRef.nativeElement.value);
    }

    readonly pluralize = {
        one: ' year',
        few: ' years',
        many: ' years',
        other: ' years',
    };
}
