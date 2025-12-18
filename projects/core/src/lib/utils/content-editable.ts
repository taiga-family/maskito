import type {MaskitoElement, TextfieldLike} from '../types';
import {getContentEditableSelection} from './dom/get-content-editable-selection';
import {setContentEditableSelection} from './dom/set-content-editable-selection';

class ContentEditableAdapter implements TextfieldLike {
    public maxLength = Infinity;

    constructor(private readonly element: HTMLElement) {}

    public get value(): string {
        return this.element.innerText.replace(/\n\n$/, '\n');
    }

    public set value(value) {
        // Setting into innerHTML of element with `white-space: pre;` style
        this.element.innerHTML = value.replace(/\n$/, '\n\n');
    }

    public get selectionStart(): number | null {
        return getContentEditableSelection(this.element)[0];
    }

    public get selectionEnd(): number | null {
        return getContentEditableSelection(this.element)[1];
    }

    public setSelectionRange(from: number | null, to: number | null): void {
        setContentEditableSelection(this.element, [from ?? 0, to ?? 0]);
    }

    public select(): void {
        this.setSelectionRange(0, this.value.length);
    }
}

export function maskitoAdaptContentEditable(element: HTMLElement): MaskitoElement {
    const adapter = new ContentEditableAdapter(element);

    return new Proxy(element, {
        get(target, prop: keyof HTMLElement) {
            if (prop in adapter) {
                return adapter[prop as keyof ContentEditableAdapter];
            }

            const nativeProperty = target[prop];

            return typeof nativeProperty === 'function'
                ? nativeProperty.bind(target)
                : nativeProperty;
        },
        set(target, prop: keyof HTMLElement, val, receiver) {
            return Reflect.set(prop in adapter ? adapter : target, prop, val, receiver);
        },
    }) as MaskitoElement;
}
