import type {MaskitoOptions} from '@maskito/core';
import type {RenderResult} from '@testing-library/react';
import {render} from '@testing-library/react';
import type {UserEvent} from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import type {JSX} from 'react';

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
    function TestComponent({onChangeHandler}: Readonly<{onChangeHandler?: (value: string) => void}>): JSX.Element {
        const inputRef = useMaskito({options});

        return (
            <input
                ref={inputRef}
                onChange={(e) => onChangeHandler?.(e.target.value)}
            />
        );
    }

    let testElement: RenderResult;
    let user: UserEvent;

    const type = async (v: string): Promise<void> => user.type(testElement.getByRole('textbox'), v);
    const getValue = (): string => (testElement.getByRole('textbox') as HTMLInputElement).value;

    it('should format input value', async () => {
        testElement = render(<TestComponent />);
        user = userEvent.setup();

        await type('12345.6789');
        expect(getValue()).toBe('12345,67');
    });

    it('should trigger onChange event even when Maskito edits value', async () => {
        const handler = jest.fn();

        testElement = render(<TestComponent onChangeHandler={handler} />);
        user = userEvent.setup();

        await type('1.');
        expect(handler).toHaveBeenLastCalledWith('1,');
        expect(handler).toHaveBeenCalledTimes(2);
        expect(getValue()).toBe('1,');
    });

    afterEach(() => {
        testElement.unmount();
    });
});
