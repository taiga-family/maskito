import {MaskitoElementPredicateSync} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicateSync = e =>
    e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
    (e as HTMLInputElement | HTMLTextAreaElement);
