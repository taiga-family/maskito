import type {MaskitoElementPredicate} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicate = e =>
    e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
    (e as HTMLInputElement | HTMLTextAreaElement);
