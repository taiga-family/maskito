export interface MaskitoElement
    extends Pick<
        HTMLInputElement,
        | 'addEventListener'
        | 'dispatchEvent'
        | 'isContentEditable'
        | 'matches'
        | 'maxLength'
        | 'nodeName'
        | 'ownerDocument'
        | 'removeEventListener'
        | 'selectionEnd'
        | 'selectionStart'
        | 'setSelectionRange'
        | 'value'
    > {}
