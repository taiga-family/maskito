import {ElementState} from '../types';

export function areElementValuesEqual(
    sampleState: ElementState,
    ...states: ElementState[]
): boolean {
    return states.every(({value}) => value === sampleState.value);
}

export function areElementStatesEqual(
    sampleState: ElementState,
    ...states: ElementState[]
): boolean {
    return states.every(
        ({value, selection}) =>
            value === sampleState.value &&
            selection[0] === sampleState.selection[0] &&
            selection[1] === sampleState.selection[1],
    );
}
