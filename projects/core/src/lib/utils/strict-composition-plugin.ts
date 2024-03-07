import type {ElementState, MaskitoPlugin, TypedInputEvent} from '../types';
import {maskitoUpdateElement} from './dom/update-element';
import {areElementStatesEqual} from './element-states-equality';
import {maskitoTransform} from './transform';

export function maskitoStrictCompositionPlugin(): MaskitoPlugin {
    return (element, maskitoOptions) => {
        const listener = (event: TypedInputEvent): void => {
            if (event.inputType !== 'insertCompositionText') {
                return;
            }

            const selection = [
                element.selectionStart || 0,
                element.selectionEnd || 0,
            ] as const;
            const elementState: ElementState = {
                selection,
                value: element.value,
            };
            const validatedState = maskitoTransform(elementState, maskitoOptions);

            if (!areElementStatesEqual(elementState, validatedState)) {
                event.preventDefault();
                maskitoUpdateElement(element, validatedState);
            }
        };

        element.addEventListener('input', listener as EventListener);

        return () => element.removeEventListener('input', listener as EventListener);
    };
}
