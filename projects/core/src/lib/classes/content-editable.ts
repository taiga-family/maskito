import {MaskitoElement} from '../types/maskito-element';
import {getContentEditableSelection} from '../utils/dom/get-content-editable-selection';
import {setContentEditableSelection} from '../utils/dom/set-content-editable-selection';

export class MaskitoContentEditable implements MaskitoElement {
    // declared fields
    declare addEventListener: HTMLElement['addEventListener'];
    declare removeEventListener: HTMLElement['removeEventListener'];

    declare dispatchEvent: HTMLElement['dispatchEvent'];
    declare isContentEditable: HTMLElement['isContentEditable'];
    declare nodeName: HTMLElement['nodeName'];
    declare matches: HTMLElement['matches'];
    declare ownerDocument: HTMLElement['ownerDocument'];

    constructor(private readonly element: HTMLElement) {
        const proxyHost = this;

        // Proxy used to forward properties from HTMLElement to our instance
        return new Proxy(element as unknown as MaskitoContentEditable, {
            get(target, prop: keyof HTMLElement) {
                if (prop in proxyHost) {
                    return proxyHost[prop as keyof MaskitoContentEditable];
                }

                const nativeProperty = target[prop as keyof MaskitoContentEditable];

                return typeof nativeProperty === 'function'
                    ? nativeProperty.bind(target)
                    : nativeProperty;
            },
            set(target, prop: keyof HTMLElement, val, receiver) {
                return Reflect.set(
                    prop in proxyHost ? proxyHost : target,
                    prop,
                    val,
                    receiver,
                );
            },
        });
    }

    get maxLength(): number {
        return -1;
    }

    get value(): string {
        return this.element.innerText.replace(/\n\n$/, '\n');
    }

    set value(value) {
        // Setting into innerHTML of element with `white-space: pre;` style
        this.element.innerHTML = value.replace(/\n$/, '\n\n');
    }

    get selectionStart(): number | null {
        const [from] = getContentEditableSelection(this.element);

        return from;
    }

    get selectionEnd(): number | null {
        const [, to] = getContentEditableSelection(this.element);

        return to;
    }

    setSelectionRange(from: number | null, to: number | null): void {
        setContentEditableSelection(this.element, [from || 0, to || 0]);
    }
}
