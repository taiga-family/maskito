import {MaskitoElement, TextfieldLike} from '../types';
import {getContentEditableSelection, setContentEditableSelection} from './index';

class ContentEditableAdapter implements TextfieldLike {
    public maxLength = Infinity;

    constructor(private readonly element: HTMLElement) {}

    public get value(): string {
        return this.element.textContent || '';
    }

    public set value(value) {
        this.element.textContent = value;
    }

    public get selectionStart(): number | null {
        return getContentEditableSelection(this.element)[0];
    }

    public get selectionEnd(): number | null {
        return getContentEditableSelection(this.element)[1];
    }

    public setSelectionRange(from: number | null, to: number | null): void {
        setContentEditableSelection(this.element, [from || 0, to || 0]);
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
