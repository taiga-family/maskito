import type {MaskitoOptions} from '@maskito/core';
import {render, screen, userEvent} from '@testing-library/react-native';
import type {TestInstance} from 'test-renderer';

import {MaskedInput} from './maskedInput';

const cardMask: MaskitoOptions = {
    mask: [
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 4}).fill(/\d/),
        ' ',
        ...Array.from<RegExp>({length: 3}).fill(/\d/),
    ],
};

describe('ReactNative | Card', () => {
    let input!: TestInstance;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(async () => {
        await render(<MaskedInput options={cardMask} />);

        input = screen.getByTestId('input');
        user = userEvent.setup();
    });

    it('adds a space after every 4 digits', async () => {
        await user.type(input, '1234456778900123');

        expect(input).toHaveProp('value', '1234 4567 7890 0123');
        expect(input).toHaveProp('caretIndex', '1234 4567 7890 0123'.length);
    });

    it('ignores all same digits beyond the 19-digit limit', async () => {
        await user.type(input, '2222222222222222');

        expect(input).toHaveProp('value', '2222 2222 2222 2222');
        expect(input).toHaveProp('caretIndex', '2222 2222 2222 2222'.length);
    });
});
