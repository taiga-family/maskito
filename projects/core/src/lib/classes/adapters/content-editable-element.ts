type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly [Q in P]: T[P]}, P>;
}[keyof T];

function isWritable<T>(obj: T, property: keyof T): property is WritableKeys<T> {
    const descriptor = Object.getOwnPropertyDescriptor(obj, property);

    return Boolean(descriptor && descriptor.writable);
}

export class MaskitoReactContentEditableElement {
    private host: HTMLElement;
    proxy: HTMLInputElement;

    constructor(host: HTMLElement) {
        if (!host.isContentEditable) {
            throw new Error(
                'Passed into MaskitoReactContentEditableElement element should be contenteditable',
            );
        }

        this.host = host;

        // Proxy used to forward properties from HTMLElement to our instance
        this.proxy = new Proxy(this, {
            get: (_target, prop) => {
                if (prop in this) {
                    const field = this[prop as keyof typeof this];

                    return typeof field === 'function'
                        ? (...args: unknown[]) => field.apply(this, args)
                        : field;
                }

                const field = this.host[prop as keyof typeof this.host];

                return typeof field === 'function'
                    ? (...args: unknown[]) =>
                          // @ts-ignore we can't get type of arguments that we forwarding
                          field.apply(this.host, args)
                    : field;
            },
            set: (_target, prop, value) => {
                if (prop in this) {
                    this[prop as keyof typeof this] = value;
                }

                const hostProp = prop as keyof typeof this.host;

                if (isWritable(this.host, hostProp)) {
                    // @ts-ignore we can't get type of property that we setting
                    this.host[hostProp] = value;
                }

                return true;
            },
        }) as unknown as HTMLInputElement;
    }

    get value(): string {
        return this.host.textContent || '';
    }

    set value(value) {
        this.host.textContent = value;
    }

    private get selection(): {from: number | null; to: number | null} {
        const selection = getSelection();

        if (!selection) {
            return {from: null, to: null};
        }

        const from = Math.min(selection.anchorOffset, selection.focusOffset);
        const to = Math.max(selection.anchorOffset, selection.focusOffset);

        return {from, to};
    }

    get selectionStart(): number | null {
        return this.selection.from;
    }

    get selectionEnd(): number | null {
        return this.selection.to;
    }

    setSelectionRange(from: number | null, to: number | null): void {
        if (from === null || to === null) {
            return;
        }

        const range = document.createRange();

        const maxRangeIndex = this.value.length;

        range.setStart(this.host.firstChild || this.host, Math.min(from, maxRangeIndex));
        range.setEnd(this.host.lastChild || this.host, Math.min(to, maxRangeIndex));
        const selection = getSelection();

        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
