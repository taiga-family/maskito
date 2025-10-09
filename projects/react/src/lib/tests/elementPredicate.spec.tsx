import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_ELEMENT_PREDICATE, maskitoInitialCalibrationPlugin} from '@maskito/core';
import type {RenderResult} from '@testing-library/react';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type {JSX} from 'react';

import {useMaskito} from '../useMaskito';

describe('@maskito/react | `elementPredicate` property', () => {
    const options: MaskitoOptions = {
        mask: /^\d+$/,
        plugins: [maskitoInitialCalibrationPlugin()],
    };
    let predicate: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    const correctPredicate: MaskitoElementPredicate = (host) => host.querySelector<HTMLInputElement>('.real-input')!;
    const wrongPredicate: MaskitoElementPredicate = (host) => host.querySelector('input')!;

    function TestComponent({elementPredicate = predicate}): JSX.Element {
        const inputRef = useMaskito({options, elementPredicate});

        return (
            <div ref={inputRef}>
                <input className="hidden-input" />
                <input
                    className="real-input"
                    placeholder="Enter number"
                />
                <input className="hidden-input" />
            </div>
        );
    }

    let testElement: RenderResult;

    const setValue = async (user: ReturnType<typeof userEvent.setup>, v: string): Promise<void> =>
        user.type(testElement.getByPlaceholderText('Enter number'), v);
    const getValue = (): string => (testElement.getByPlaceholderText('Enter number') as HTMLInputElement).value;

    afterEach(() => {
        testElement.unmount();
    });

    describe('Sync predicate', () => {
        it('applies mask to the textfield if predicate is correct', async () => {
            predicate = correctPredicate;
            testElement = render(<TestComponent />);

            const user = userEvent.setup();

            await setValue(user, '123blah45');
            expect(getValue()).toBe('12345');
        });

        it('does not applies mask to the textfield if predicate is incorrect', async () => {
            predicate = wrongPredicate;
            testElement = render(<TestComponent />);

            const user = userEvent.setup();

            await setValue(user, '123blah45');
            expect(getValue()).toBe('123blah45');
        });
    });

    describe('Async predicate', () => {
        it('predicate resolves in next micro task', async () => {
            const user = userEvent.setup();

            predicate = async (host) => Promise.resolve(correctPredicate(host));
            testElement = render(<TestComponent />);

            await setValue(user, '123blah45');

            await waitFor(() => {
                expect(getValue()).toBe('12345');
            });
        });

        it('predicate resolves in next macro task', async () => {
            const user = userEvent.setup();

            predicate = async (host) =>
                new Promise((resolve) => {
                    setTimeout(() => resolve(correctPredicate(host)));
                });
            testElement = render(<TestComponent />);

            await setValue(user, '123blah45');

            await waitFor(() => {
                expect(getValue()).toBe('12345');
            });
        });

        it('predicate resolves in 100ms', async () => {
            const user = userEvent.setup();

            predicate = async (host) =>
                new Promise((resolve) => {
                    setTimeout(() => resolve(correctPredicate(host)), 100);
                });
            testElement = render(<TestComponent />);

            await setValue(user, '123blah45');

            await waitFor(() => {
                expect(getValue()).toBe('12345');
            });
        });
    });
});
