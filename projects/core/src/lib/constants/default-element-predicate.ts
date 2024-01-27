import {MaskitoReactContentEditableElement} from '../classes';
import {MaskitoElementPredicate} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicate = e => {
    if (e.isContentEditable) {
        return new MaskitoReactContentEditableElement(e).proxy;
    }

    return (
        e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
        (e as HTMLInputElement | HTMLTextAreaElement)
    );
};
