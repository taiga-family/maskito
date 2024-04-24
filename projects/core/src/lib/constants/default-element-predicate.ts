import type {MaskitoElementPredicate} from '../types';
import {maskitoAdaptContentEditable} from '../utils/content-editable';

export const MASKITO_DEFAULT_ELEMENT_PREDICATE: MaskitoElementPredicate = e =>
    e.isContentEditable
        ? maskitoAdaptContentEditable(e)
        : e.querySelector<HTMLInputElement | HTMLTextAreaElement>('input,textarea') ||
          (e as HTMLInputElement | HTMLTextAreaElement);
