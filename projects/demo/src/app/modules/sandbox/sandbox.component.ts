import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import {Mask} from '@maskito/core';

@Component({
    selector: 'sandbox',
    templateUrl: './sandbox.template.html',
    styleUrls: ['./sandbox.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxComponent implements AfterViewInit {
    @ViewChild('inputRef')
    private readonly inputRef!: ElementRef<HTMLInputElement>;

    @ViewChild('textAreaRef')
    private readonly textAreaRef!: ElementRef<HTMLTextAreaElement>;

    ngAfterViewInit() {
        const maskedInput = new Mask(this.inputRef.nativeElement);
        const maskedTextArea = new Mask(this.textAreaRef.nativeElement);

        // eslint-disable-next-line no-console
        console.log(maskedInput, maskedTextArea);
    }
}
