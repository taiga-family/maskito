import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import {Mask} from '@maskito/core';
import {INPUT_NUMBER_MASK, INPUT_PHONE_MASK, NO_CYRILLIC_MASK} from './masks';

@Component({
    selector: 'sandbox',
    templateUrl: './sandbox.template.html',
    styleUrls: ['./sandbox.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent implements AfterViewInit, OnDestroy {
    @ViewChild('inputNumber')
    private readonly inputNumberRef!: ElementRef<HTMLInputElement>;

    @ViewChild('inputPhone')
    private readonly inputPhoneRef!: ElementRef<HTMLInputElement>;

    @ViewChild('textAreaRef')
    private readonly textAreaRef!: ElementRef<HTMLTextAreaElement>;

    private maskedInputPhone: Mask | null = null;
    private maskedInputNumber: Mask | null = null;
    private maskedTextArea: Mask | null = null;

    ngAfterViewInit() {
        this.maskedInputPhone = new Mask(this.inputPhoneRef.nativeElement, {
            mask: INPUT_PHONE_MASK,
        });
        this.maskedInputNumber = new Mask(this.inputNumberRef.nativeElement, {
            mask: INPUT_NUMBER_MASK,
        });
        this.maskedTextArea = new Mask(this.textAreaRef.nativeElement, {
            mask: NO_CYRILLIC_MASK,
        });
    }

    ngOnDestroy() {
        this.maskedInputPhone?.destroy();
        this.maskedInputNumber?.destroy();
        this.maskedTextArea?.destroy();
    }
}
