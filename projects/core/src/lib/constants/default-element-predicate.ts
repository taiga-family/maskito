import {MaskitoElementPredicate} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicate = e =>
    e.querySelector('input,textarea') || (e as HTMLInputElement | HTMLTextAreaElement);
