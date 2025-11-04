import type {
    ElementState,
    MaskitoMaskExpression,
    MaskitoOptions,
    SelectionRange,
} from '../../types';
import {areElementStatesEqual} from '../../utils/element-states-equality';
import {applyOverwriteMode} from './utils/apply-overwrite-mode';
import {calibrateValueByMask} from './utils/calibrate-value-by-mask';
import {removeFixedMaskCharacters} from './utils/remove-fixed-mask-characters';
import {newCharacterIsInvalid} from './utils/validate-new-characters';

export class MaskModel implements ElementState {
    private readonly unmaskInitialState: ElementState = {value: '', selection: [0, 0]};

    public value = '';
    public selection: SelectionRange = [0, 0];

    constructor(
        initialElementState: ElementState,
        private readonly maskOptions: Required<MaskitoOptions>,
    ) {
        const expression = this.getMaskExpression(initialElementState);
        const {value, selection} = calibrateValueByMask(initialElementState, expression);

        this.unmaskInitialState = removeFixedMaskCharacters(
            {value, selection},
            expression,
        );
        this.value = value;
        this.selection = selection;
    }

    public addCharacters(newCharacters: string): void {
        const {value, selection, maskOptions} = this;
        const initialElementState = {value, selection} as const;
        const {
            selection: [from, to],
        } = applyOverwriteMode(
            initialElementState,
            newCharacters,
            maskOptions.overwriteMode,
        );
        const maskExpression = this.getMaskExpression({
            value: value.slice(0, from) + newCharacters + value.slice(to),
            selection: [from + newCharacters.length, from + newCharacters.length],
        });
        const [unmaskedFrom, unmaskedTo] = applyOverwriteMode(
            this.unmaskInitialState,
            newCharacters,
            maskOptions.overwriteMode,
        ).selection;
        const newUnmaskedLeadingValuePart =
            this.unmaskInitialState.value.slice(0, unmaskedFrom) + newCharacters;
        const newCaretIndex = newUnmaskedLeadingValuePart.length;
        const maskedElementState = calibrateValueByMask(
            {
                value:
                    newUnmaskedLeadingValuePart +
                    this.unmaskInitialState.value.slice(unmaskedTo),
                selection: [newCaretIndex, newCaretIndex],
            },
            maskExpression,
            initialElementState,
        );
        const prevLeadingPart = value.slice(0, from);
        const newLeadingPartState = calibrateValueByMask(
            {
                value: newUnmaskedLeadingValuePart,
                selection: [newCaretIndex, newCaretIndex],
            },
            maskExpression,
            initialElementState,
        );

        const isInvalidCharsInsertion =
            newLeadingPartState.value === prevLeadingPart ||
            (newLeadingPartState.value.length < prevLeadingPart.length &&
                removeFixedMaskCharacters(newLeadingPartState, maskExpression).value ===
                    this.unmaskInitialState.value.slice(0, unmaskedFrom));

        // Validate that each new character matches its target position in the mask
        const isInvalidNewChars = newCharacterIsInvalid({
            newCharacters,
            newUnmaskedLeadingValuePart,
            unmaskedFrom,
            maskExpression,
        });

        if (
            isInvalidCharsInsertion ||
            isInvalidNewChars ||
            areElementStatesEqual(this, maskedElementState) // If typing new characters does not change value
        ) {
            throw new Error('Invalid mask value');
        }

        this.value = maskedElementState.value;
        this.selection = maskedElementState.selection;
    }

    public deleteCharacters(): void {
        const [from, to] = this.selection;

        if (from === to || !to) {
            return;
        }

        const {value} = this;
        const maskExpression = this.getMaskExpression({
            value: value.slice(0, from) + value.slice(to),
            selection: [from, from],
        });
        const initialElementState = {value, selection: [from, to]} as const;
        const [unmaskedFrom, unmaskedTo] = this.unmaskInitialState.selection;
        const newUnmaskedValue =
            this.unmaskInitialState.value.slice(0, unmaskedFrom) +
            this.unmaskInitialState.value.slice(unmaskedTo);

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
