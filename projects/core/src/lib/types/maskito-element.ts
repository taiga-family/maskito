export type TextfieldLike = Pick<
    HTMLInputElement,
    | 'maxLength'
    | 'select'
    | 'selectionEnd'
    | 'selectionStart'
    | 'setSelectionRange'
    | 'value'
>;
export type MaskitoElement = HTMLElement & TextfieldLike;
