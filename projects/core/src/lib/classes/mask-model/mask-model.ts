import {ElementState, MaskExpression, MaskitoOptions, SelectionRange} from '../../types';
import {applyOverwriteMode} from './utils/apply-overwrite-mode';
import {calibrateValueByMask} from './utils/calibrate-value-by-mask';
import {removeFixedMaskCharacters} from './utils/remove-fixed-mask-characters';

export class MaskModel implements ElementState {
    value = '';
    selection: SelectionRange = [0, 0];

    private get maskExpression(): MaskExpression {
        const {mask} = this.maskOptions;

        return typeof mask === 'function' ? mask() : mask;
    }

    constructor(
        readonly initialElementState: ElementState,
        private readonly maskOptions: MaskitoOptions,
    ) {
        const {value, selection} = calibrateValueByMask(
            initialElementState,
            this.maskExpression,
        );

        this.value = value;
        this.selection = selection;
    }

    addCharacters(selection: SelectionRange, newCharacters: string): void {
        const {maskExpression, value} = this;
        const unmaskedElementState = removeFixedMaskCharacters(
            {value, selection},
            maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] =
            newCharacters.length <= 1
                ? applyOverwriteMode(unmaskedElementState, this.maskOptions.overwriteMode)
                      .selection
                : unmaskedElementState.selection;
        const newUnmaskedValue =
            unmaskedElementState.value.slice(0, unmaskedFrom) +
            newCharacters +
            unmaskedElementState.value.slice(unmaskedTo);

        const newCaretIndex = unmaskedFrom + newCharacters.length;
        const maskedElementState = calibrateValueByMask(
            {
                value: newUnmaskedValue,
                selection: [newCaretIndex, newCaretIndex],
            },
            maskExpression,
        );

        if (maskedElementState.value === value) {
            // If typing new characters does not change value
            throw new Error('Invalid mask value');
        }

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }

    deleteCharacters([from, to]: SelectionRange): void {
        if (from === 0 && to === 0) {
            return;
        }

        if (from === to) {
            return;
        }

        const {maskExpression, value} = this;
        const unmaskedElementState = removeFixedMaskCharacters(
            {value, selection: [from, to]},
            maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedElementState.selection;
        const newUnmaskedValue =
            unmaskedElementState.value.slice(0, unmaskedFrom) +
            unmaskedElementState.value.slice(unmaskedTo);

        const maskedElementState = calibrateValueByMask(
            {value: newUnmaskedValue, selection: [unmaskedFrom, unmaskedFrom]},
            maskExpression,
        );

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }
}
