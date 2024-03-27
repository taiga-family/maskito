export type TextfieldLike = Pick<
    HTMLInputElement,
    'maxLength' | 'selectionEnd' | 'selectionStart' | 'setSelectionRange' | 'value'
>;
export type MaskitoElement = HTMLElement & TextfieldLike;
