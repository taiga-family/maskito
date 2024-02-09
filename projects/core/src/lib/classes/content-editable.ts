import type {MaskitoElement} from '../types';
import {getContentEditableSelection, setContentEditableSelection} from '../utils';

// @ts-ignore Type MaskitoContentEditable is missing the following properties from type HTMLElement: accessKey, accessKeyLabel, autocapitalize, dir etc.
export class MaskitoContentEditable implements MaskitoElement {
    protected maxLength = Infinity;

    constructor(private readonly element: HTMLElement) {
        const proxyHost = this;

        /**
         * We cannot just write `export class MaskitoContentEditable extends Proxy`.
         * > The Proxy constructor does not have a prototype property because
         * > proxy exotic objects do not have a [[Prototype]] internal slot that requires initialization.
         */
        return new Proxy(element as any, {
            get(target, prop: keyof HTMLElement) {
                if (prop in proxyHost) {
                    return proxyHost[prop as keyof MaskitoContentEditable];
                }

                const nativeProperty = target[prop];

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

    protected get value(): string {
        return this.element.textContent || '';
    }

    protected set value(value) {
        this.element.textContent = value;
    }

    protected get selectionStart(): number | null {
        return getContentEditableSelection(this.element)[0];
    }

    protected get selectionEnd(): number | null {
        return getContentEditableSelection(this.element)[1];
    }

    protected setSelectionRange(from: number | null, to: number | null): void {
        setContentEditableSelection(this.element, [from || 0, to || 0]);
    }
}
