import {
    ElementState,
    MaskitoMaskExpression,
    MaskitoOptions,
    SelectionRange,
} from '../../types';
import {areElementStatesEqual} from '../../utils/element-states-equality';
import {applyOverwriteMode} from './utils/apply-overwrite-mode';
import {calibrateValueByMask} from './utils/calibrate-value-by-mask';
import {removeFixedMaskCharacters} from './utils/remove-fixed-mask-characters';

export class MaskModel implements ElementState {
    value = '';
    selection: SelectionRange = [0, 0];

    constructor(
        readonly initialElementState: ElementState,
        private readonly maskOptions: Required<MaskitoOptions>,
    ) {
        const {value, selection} = calibrateValueByMask(
            initialElementState,
            this.getMaskExpression(initialElementState),
        );

        this.value = value;
        this.selection = selection;
    }

    addCharacters([from, to]: SelectionRange, newCharacters: string): void {
        const {value} = this;
        const maskExpression = this.getMaskExpression({
            value: value.slice(0, from) + newCharacters + value.slice(to),
            selection: [from + newCharacters.length, from + newCharacters.length],
        });
        const initialElementState = {value, selection: [from, to]} as const;
        const unmaskedElementState = removeFixedMaskCharacters(
            initialElementState,
            maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] = applyOverwriteMode(
            unmaskedElementState,
            newCharacters,
            this.maskOptions.overwriteMode,
        ).selection;
        const newUnmaskedLeadingValuePart =
            unmaskedElementState.value.slice(0, unmaskedFrom) + newCharacters;
        const newCaretIndex = newUnmaskedLeadingValuePart.length;
        const maskedElementState = calibrateValueByMask(
            {
                value:
                    newUnmaskedLeadingValuePart +
                    unmaskedElementState.value.slice(unmaskedTo),
                selection: [newCaretIndex, newCaretIndex],
            },
            maskExpression,
            initialElementState,
        );
        const isInvalidCharsInsertion =
            // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
            value.slice(0, unmaskedFrom) ===
            calibrateValueByMask(
                {
                    value: newUnmaskedLeadingValuePart,
                    selection: [newCaretIndex, newCaretIndex],
                },
                maskExpression,
                initialElementState,
            ).value;

        if (
            isInvalidCharsInsertion ||
            areElementStatesEqual(this, maskedElementState) // If typing new characters does not change value
        ) {
            throw new Error('Invalid mask value');
        }

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }

    deleteCharacters([from, to]: SelectionRange): void {
        if (from === to || !to) {
            return;
        }

        const {value} = this;
        const maskExpression = this.getMaskExpression({
            value: value.slice(0, from) + value.slice(to),
            selection: [from, from],
        });
        const initialElementState = {value, selection: [from, to]} as const;
        const unmaskedElementState = removeFixedMaskCharacters(
            initialElementState,
            maskExpression,
        );
        const [unmaskedFrom, unmaskedTo] = unmaskedElementState.selection;
        const newUnmaskedValue =
            unmaskedElementState.value.slice(0, unmaskedFrom) +
            unmaskedElementState.value.slice(unmaskedTo);

        const maskedElementState = calibrateValueByMask(
            {value: newUnmaskedValue, selection: [unmaskedFrom, unmaskedFrom]},
            maskExpression,
            initialElementState,
        );

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }

    private getMaskExpression(elementState: ElementState): MaskitoMaskExpression {
        const {mask} = this.maskOptions;

        return typeof mask === 'function' ? mask(elementState) : mask;
    }
}
