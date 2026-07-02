import type {MaskitoOptions} from '@maskito/core';
import {render, screen, userEvent} from '@testing-library/react-native';
import type {TestInstance} from 'test-renderer';

import {MaskedInput} from './maskedInput';

const phoneMask: MaskitoOptions = {
    mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

describe('ReactNative | Phone', () => {
    let input!: TestInstance;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(async () => {
        await render(<MaskedInput options={phoneMask} />);

        input = screen.getByTestId('input');
        user = userEvent.setup();
    });

    it('formats a US phone number with brackets and dashes', async () => {
        await user.type(input, '2125552368');

        expect(input).toHaveProp('value', '+1 (212) 555-2368');
        expect(input).toHaveProp('caretIndex', '+1 (212) 555-2368'.length);
    });

    it('drops non-digit characters while typing', async () => {
        await user.type(input, '21a25b55c2368');

        expect(input).toHaveProp('value', '+1 (212) 555-2368');
        expect(input).toHaveProp('caretIndex', '+1 (212) 555-2368'.length);
    });
});
