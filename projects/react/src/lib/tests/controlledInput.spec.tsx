import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import type {RenderResult} from '@testing-library/react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type {JSX} from 'react';
import {useCallback, useState} from 'react';

describe('Maskito with React controlled input', () => {
    let testElement: RenderResult;

    const setValue = async (user: ReturnType<typeof userEvent.setup>, v: string): Promise<void> =>
        user.type(testElement.getByRole('textbox'), v);
    const getValue = (): string => (testElement.getByRole('textbox') as HTMLInputElement).value;

    function TestComponent({handler, options}: Readonly<{handler?: Function; options: MaskitoOptions}>): JSX.Element {
        const inputRef = useMaskito({options});
        const [value, setValue] = useState('');

        return (
            <input
                ref={inputRef}
                value={value}
                onInput={(e) => {
                    const value = (e.target as HTMLInputElement).value;

                    return handler ? handler(value) : setValue(value);
                }}
            />
        );
    }

    describe('works with basic mask without processors (only mask expression)', () => {
        const options: MaskitoOptions = {mask: /^[a-z]$/i};

        it('updates value for setState-like action', async () => {
            testElement = render(<TestComponent options={options} />);

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(getValue()).toBe('');
            await setValue(user, 'T'); // valid character
            expect(getValue()).toBe('T');
        });

        it('does not update value for noop handler of onInput event', async () => {
            const noop = (): void => {};

            testElement = render(
                <TestComponent
                    handler={noop}
                    options={options}
                />,
            );

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(getValue()).toBe('');
            await setValue(user, 'T'); // valid character
            expect(getValue()).toBe('');
        });

        it('triggers onInput handler on every valid input', async () => {
            const handler = jest.fn();

            testElement = render(
                <TestComponent
                    handler={handler}
                    options={options}
                />,
            );

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(handler).not.toHaveBeenCalled();
            await setValue(user, 'T'); // valid character
            expect(handler).toHaveBeenCalledWith('T');
        });

        it('state-handler can modify element value', async () => {
            function App(): JSX.Element {
                const inputRef = useMaskito({options});
                const [value, setValue] = useState('');
                const onInputHandler = useCallback(
                    ({value}: HTMLInputElement) => setValue(value.toUpperCase()),
                    [setValue],
                );

                return (
                    <input
                        ref={inputRef}
                        value={value}
                        onInput={(e) => onInputHandler(e.target as HTMLInputElement)}
                    />
                );
            }

            testElement = render(<App />);

            const user = userEvent.setup();

            await setValue(user, 't');
            expect(getValue()).toBe('T');
        });
    });

    describe('works with complex mask with processors', () => {
        const options: MaskitoOptions = {
            mask: /^[a-z]$/i,
            postprocessors: [({value, selection}) => ({selection, value: value.toUpperCase()})],
        };

        it('updates value for setState-like action', async () => {
            testElement = render(<TestComponent options={options} />);

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(getValue()).toBe('');
            await setValue(user, 't'); // valid character
            expect(getValue()).toBe('T');
        });

        it('does not update value for noop handler of onInput event', async () => {
            const noop = (): void => {};

            testElement = render(
                <TestComponent
                    handler={noop}
                    options={options}
                />,
            );

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(getValue()).toBe('');
            await setValue(user, 't'); // valid character
            expect(getValue()).toBe('');
        });

        it('triggers onInput handler on every valid input', async () => {
            const handler = jest.fn();

            testElement = render(
                <TestComponent
                    handler={handler}
                    options={options}
                />,
            );

            const user = userEvent.setup();

            await setValue(user, '1'); // invalid character
            expect(handler).not.toHaveBeenCalled();
            await setValue(user, 't'); // valid character
            expect(handler).toHaveBeenCalledWith('T');
        });

        it('state-handler can modify element value', async () => {
            function App(): JSX.Element {
                const inputRef = useMaskito({options});
                const [value, setValue] = useState('');
                const onInputHandler = useCallback(({value}: HTMLInputElement) => setValue(`###${value}`), [setValue]);

                return (
                    <input
                        ref={inputRef}
                        value={value}
                        onInput={(e) => onInputHandler(e.target as HTMLInputElement)}
                    />
                );
            }

            testElement = render(<App />);

            const user = userEvent.setup();

            await setValue(user, 't');
            expect(getValue()).toBe('###T');
        });
    });

    afterEach(() => {
        testElement.unmount();
    });
});
