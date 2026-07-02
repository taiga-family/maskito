import {maskitoTime} from '@maskito/kit';
import {render, screen, userEvent} from '@testing-library/react-native';
import type {TestInstance} from 'test-renderer';

import {MaskedInput} from './maskedInput';

const timeMask = maskitoTime({mode: 'HH:MM'});

describe('ReactNative | Time', () => {
    let input!: TestInstance;
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(async () => {
        await render(<MaskedInput options={timeMask} />);

        input = screen.getByTestId('input');
        user = userEvent.setup();
    });

    it('inserts the colon separator between hours and minutes', async () => {
        await user.type(input, '1234');

        expect(input).toHaveProp('value', '12:34');
        expect(input).toHaveProp('caretIndex', '12:34'.length);
    });

    it('zero-pads an unambiguous hour', async () => {
        await user.type(input, '9');

        expect(input).toHaveProp('value', '09');
        expect(input).toHaveProp('caretIndex', '09'.length);
    });

    it('rejects non-digit characters', async () => {
        await user.type(input, 'ab:cd');

        expect(input).toHaveProp('value', '');
        expect(input).toHaveProp('caretIndex', 0);
    });

    it('keeps only digits when mixed with invalid characters', async () => {
        await user.type(input, '1a2b3c4d');

        expect(input).toHaveProp('value', '12:34');
        expect(input).toHaveProp('caretIndex', '12:34'.length);
    });
});
