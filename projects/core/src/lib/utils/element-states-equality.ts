import {ElementState} from '../types';

export function areElementValuesEqual(
    sampleState: ElementState,
    ...states: ElementState[]
): boolean {
    return states.every(state => state.value === sampleState.value);
}

export function areElementStatesEqual(
    sampleState: ElementState,
    ...states: ElementState[]
): boolean {
    return states.every(
        state =>
            state.value === sampleState.value &&
            state.selection[0] === sampleState.selection[0] &&
            state.selection[1] === sampleState.selection[1],
    );
}
