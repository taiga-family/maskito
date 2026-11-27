export type TextfieldLike = Pick<
    HTMLInputElement,
    | 'maxLength'
    | 'placeholder'
    | 'select'
    | 'selectionEnd'
    | 'selectionStart'
    | 'setSelectionRange'
    | 'value'
>;
export type MaskitoElement = HTMLElement & TextfieldLike;
