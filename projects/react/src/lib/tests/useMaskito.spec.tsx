import type {MaskitoOptions} from '@maskito/core';
import type {RenderResult} from '@testing-library/react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {useMaskito} from '../useMaskito';

const options: MaskitoOptions = {
    mask: /^\d+(,\d{0,2})?$/,
    preprocessors: [
        ({elementState, data}) => {
            const {value, selection} = elementState;

            return {
                elementState: {
                    selection,
                    value: value.replace('.', ','),
                },
                data: data.replace('.', ','),
            };
        },
    ],
};

describe('Maskito React package', () => {
    function TestComponent(): JSX.Element {
        const inputRef = useMaskito({options});

        return <input ref={inputRef} />;
    }

    let testElement: RenderResult;

    const setValue = async (user: ReturnType<typeof userEvent.setup>, v: string): Promise<void> =>
        user.type(testElement.getByRole('textbox'), v);
    const getValue = (): string => (testElement.getByRole('textbox') as HTMLInputElement).value;

    beforeEach(() => {
        testElement = render(<TestComponent />);
    });

    it('should format input value', async () => {
        const user = userEvent.setup();

        await setValue(user, '12345.6789');
        expect(getValue()).toBe('12345,67');
    });

    afterEach(() => {
        testElement.unmount();
    });
});
