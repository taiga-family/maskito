import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import {Maskito} from '@maskito/core';
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

    private maskedInputPhone?: Maskito;
    private maskedInputNumber?: Maskito;
    private maskedTextArea?: Maskito;

    ngAfterViewInit() {
        this.maskedInputPhone = new Maskito(this.inputPhoneRef.nativeElement, {
            mask: INPUT_PHONE_MASK,
        });
        this.maskedInputNumber = new Maskito(this.inputNumberRef.nativeElement, {
            mask: INPUT_NUMBER_MASK,
        });
        this.maskedTextArea = new Maskito(this.textAreaRef.nativeElement, {
            mask: NO_CYRILLIC_MASK,
        });
    }

    ngOnDestroy() {
        this.maskedInputPhone?.destroy();
        this.maskedInputNumber?.destroy();
        this.maskedTextArea?.destroy();
    }
}
