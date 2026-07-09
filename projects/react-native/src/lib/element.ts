import {type MaskitoElement} from '@maskito/core';

const noop = (): void => {};

export function createHeadlessElement({
    value = '',
    maxLength = -1,
}: Partial<MaskitoElement> = {}): MaskitoElement {
    const textfieldLike: Omit<MaskitoElement, keyof HTMLElement> = {
        maxLength,
        value,
        selectionStart: 0,
        selectionEnd: 0,
        setSelectionRange(from: number, to: number): void {
            this.selectionStart = from;
            this.selectionEnd = to;
        },
        select(): void {
            this.setSelectionRange(0, this.value.length);
        },
    };

    const minimumDOMmocks: Pick<
        MaskitoElement,
        | 'addEventListener'
        | 'isContentEditable'
        | 'matches'
        | 'nodeName'
        | 'removeEventListener'
    > = {
        nodeName: 'INPUT',
        isContentEditable: false,
        addEventListener: noop,
        removeEventListener: noop,
        matches: (): this is unknown => true,
    };

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {...textfieldLike, ...minimumDOMmocks} as MaskitoElement;
}
