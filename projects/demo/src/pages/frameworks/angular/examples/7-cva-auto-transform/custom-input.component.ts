import {ChangeDetectionStrategy, Component, forwardRef, signal} from '@angular/core';
import {type ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'custom-input',
    template: `
        <input
            [value]="value()"
            (input)="onInput($event)"
            (blur)="onTouched()"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true,
        },
    ],
})
export class CustomInputComponent implements ControlValueAccessor {
    protected readonly value = signal('');

    public writeValue(value: string | null): void {
        this.value.set(value ?? '');
    }

    public registerOnChange(onChange: (value: string) => void): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    protected onInput(event: Event): void {
        const input = event.target as HTMLInputElement;

        this.value.set(input.value);
        this.onChange(input.value);
    }

    protected onTouched = (): void => {};

    private onChange = (_: string): void => {};
}
