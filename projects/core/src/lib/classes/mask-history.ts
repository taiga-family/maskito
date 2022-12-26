import type {ElementState, SelectionRange, TypedInputEvent} from '../types';

export abstract class MaskHistory {
    protected abstract updateValue(
        value: string,
        eventInit: Pick<TypedInputEvent, 'inputType' | 'data'>,
    ): void;

    protected abstract updateSelectionRange(selection: SelectionRange): void;

    private now: ElementState | null = null;
    private readonly past: ElementState[] = [];
    private future: ElementState[] = [];

    protected undo(): void {
        const state = this.past.pop();

        if (state && this.now) {
            this.future.push(this.now);
            this.updateElement(state, 'historyUndo');
        }
    }

    protected redo(): void {
        const state = this.future.pop();

        if (state && this.now) {
            this.past.push(this.now);
            this.updateElement(state, 'historyRedo');
        }
    }

    protected updateHistory(state: ElementState): void {
        if (!this.now) {
            this.now = state;

            return;
        }

        const isValueChanged = this.now.value !== state.value;
        const isSelectionChanged = this.now.selection.some(
            (item, index) => item !== state.selection[index],
        );

        if (!isValueChanged && !isSelectionChanged) {
            return;
        }

        if (isValueChanged) {
            this.past.push(this.now);
            this.future = [];
        }

        this.now = state;
    }

    private updateElement(
        state: ElementState,
        inputType: TypedInputEvent['inputType'],
    ): void {
        this.now = state;
        this.updateValue(state.value, {inputType, data: null});
        this.updateSelectionRange(state.selection);
    }
}
