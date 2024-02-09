import {MaskitoContentEditable} from '../classes';
import type {MaskitoElement, MaskitoElementPredicate} from '../types';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicate = e =>
    e.isContentEditable
        ? (new MaskitoContentEditable(e) as unknown as MaskitoElement)
        : e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
          (e as HTMLInputElement | HTMLTextAreaElement);
