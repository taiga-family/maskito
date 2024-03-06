import type {SelectionRange} from './selection-range';

export interface ElementState {
    readonly value: string;
    readonly selection: SelectionRange;
}
