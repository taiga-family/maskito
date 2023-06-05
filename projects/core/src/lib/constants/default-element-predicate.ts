import {SyncMaskitoElementPredicate} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: SyncMaskitoElementPredicate = e =>
    e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
    (e as HTMLInputElement | HTMLTextAreaElement);
