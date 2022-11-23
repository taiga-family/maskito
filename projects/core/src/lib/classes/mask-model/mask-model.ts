import {ElementState, MaskExpression, MaskitoOptions, SelectionRange} from '../../types';
import {validateValueWithMask} from './utils/validate-value-with-mask';
import {removeFixedMaskCharacters} from './utils/remove-fixed-mask-characters';
import {addFixedMaskCharacters} from './utils/add-fixed-mask-characters';

export class MaskModel {
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
        const {value, selection} = addFixedMaskCharacters(
            initialElementState,
            this.maskExpression,
        );

        this.value = value;
        this.selection = selection;
    }

    addCharacters(selection: SelectionRange, newCharacters: string): void {
        const unmaskedElementState = removeFixedMaskCharacters(
            {value: this.value, selection},
            this.maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedElementState.selection;
        const newUnmaskedValue =
            unmaskedElementState.value.slice(0, unmaskedFrom) +
            newCharacters +
            unmaskedElementState.value.slice(unmaskedTo);

        const newCaretIndex = unmaskedTo + newCharacters.length;
        const maskedElementState = addFixedMaskCharacters(
            {
                value: newUnmaskedValue,
                selection: [newCaretIndex, newCaretIndex],
            },
            this.maskExpression,
        );

        if (!validateValueWithMask(maskedElementState.value, this.maskExpression)) {
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
            throw new Error('MaskModel.removeCharacters() accepts only not-empty range');
        }

        const unmaskedElementState = removeFixedMaskCharacters(
            {value: this.value, selection: [from, to]},
            this.maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedElementState.selection;
        const newUnmaskedValue =
            unmaskedElementState.value.slice(0, unmaskedFrom) +
            unmaskedElementState.value.slice(unmaskedTo);

        const maskedElementState = addFixedMaskCharacters(
            {value: newUnmaskedValue, selection: [unmaskedFrom, unmaskedFrom]},
            this.maskExpression,
        );

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }
}
