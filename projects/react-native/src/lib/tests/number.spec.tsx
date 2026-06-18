import {maskitoNumber} from '@maskito/kit';
import {render, screen, userEvent} from '@testing-library/react-native';
import type {TestInstance} from 'test-renderer';

import {MaskedInput} from './maskedInput';

const number = maskitoNumber({maximumFractionDigits: 2});

describe('ReactNative | Number', () => {
    let input!: TestInstance;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(async () => {
        await render(<MaskedInput options={number} />);

        input = screen.getByTestId('input');
        user = userEvent.setup();
    });

    it('keeps only digits and places the caret after the last one', async () => {
        await user.type(input, '1a2b3c');

        expect(input).toHaveProp('value', '123');
        expect(input).toHaveProp('caretIndex', 3);
    });

    it('Empty textfield => Type . => 0.', async () => {
        await user.type(input, '.');

        expect(input).toHaveProp('value', '0.');
        expect(input).toHaveProp('caretIndex', 2);
    });

    it('Empty textfield => Type , => 0.', async () => {
        await user.type(input, '.');

        expect(input).toHaveProp('value', '0.');
        expect(input).toHaveProp('caretIndex', 2);
    });

    it('123 456 => 123 456', async () => {
        await user.type(input, '123456');

        expect(input).toHaveProp('value', '123 456');
        expect(input).toHaveProp('caretIndex', '123 456'.length);
    });
});
