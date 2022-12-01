import {ElementState} from '../types';

export function areElementValuesEqual(
    sampleState: ElementState,
    ...states: ElementState[]
): boolean {
    return states.every(state => state.value === sampleState.value);
}
