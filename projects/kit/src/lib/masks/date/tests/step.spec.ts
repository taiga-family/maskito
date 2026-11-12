/** @jest-environment jsdom */
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';
import {Maskito} from '@maskito/core';
import {maskitoDate, type MaskitoDateParams} from '@maskito/kit';

describe('Date segment stepping', () => {
    let input: HTMLInputElement;
    let mask: Maskito;

    beforeEach(() => {
        input = document.createElement('input');
        document.body.append(input);
        input.focus();
    });

    afterEach(() => {
        mask.destroy();
        input.remove();
    });

    function setup(value: string, params: Partial<MaskitoDateParams> = {}): void {
        input.value = value;
        mask = new Maskito(input, maskitoDate({mode: 'dd/mm/yyyy', step: 1, ...params}));
    }

    function press(position: number, key = 'ArrowUp'): KeyboardEvent {
        input.setSelectionRange(position, position);

        const event = new KeyboardEvent('keydown', {
            key,
            bubbles: true,
            cancelable: true,
        });

        input.dispatchEvent(event);

        return event;
    }

    it.each([
        ['15.06.2024', 1, 'ArrowUp', '16.06.2024'],
        ['15.06.2024', 4, 'ArrowDown', '15.05.2024'],
        ['15.06.2024', 8, 'ArrowUp', '15.06.2025'],
        ['31.01.2024', 4, 'ArrowUp', '29.02.2024'],
        ['31.01.2023', 4, 'ArrowUp', '28.02.2023'],
        ['31.03.2024', 4, 'ArrowUp', '30.04.2024'],
        ['29.02.2024', 8, 'ArrowUp', '28.02.2025'],
        ['29.02.2000', 8, 'ArrowDown', '28.02.1999'],
        ['28.02.1900', 1, 'ArrowUp', '01.02.1900'],
        ['28.02.2000', 1, 'ArrowUp', '29.02.2000'],
        ['01.02.2024', 1, 'ArrowDown', '29.02.2024'],
        ['15.12.2024', 4, 'ArrowUp', '15.01.2024'],
        ['15.01.2024', 4, 'ArrowDown', '15.12.2024'],
        ['01.01.0001', 8, 'ArrowDown', '01.01.0001'],
        ['31.12.9999', 8, 'ArrowUp', '31.12.9999'],
        ['29.02.0004', 8, 'ArrowUp', '28.02.0005'],
        ['', 0, 'ArrowUp', '01'],
        ['', 0, 'ArrowDown', '31'],
        ['2', 1, 'ArrowUp', '21'],
        ['31.01', 4, 'ArrowUp', '29.02'],
        ['29.02.2', 1, 'ArrowUp', '01.02.2'],
        ['29.02.20', 1, 'ArrowDown', '28.02.20'],
        ['29.02.200', 1, 'ArrowUp', '01.02.200'],
    ])('%s, caret %s, %s → %s', (value, position, key, expected) => {
        setup(value);
        expect(press(position, key).defaultPrevented).toBe(true);
        expect(input.value).toBe(expected);
        expect(input.selectionStart).toBe(
            position > expected.length ? expected.length : position,
        );
    });

    it.each([
        ['mm/dd/yyyy', '/', '01/31/2024', 1, '02/29/2024'],
        ['yyyy/mm/dd', '-', '2024-01-31', 6, '2024-02-29'],
        ['dd/mm', '.', '31.01', 4, '29.02'],
        ['mm/dd', '.', '01.31', 1, '02.29'],
        ['mm/yy', '/', '02/24', 4, '02/25'],
        ['mm/yy', '/', '02/99', 4, '02/99'],
        ['mm/yyyy', '.', '02.2024', 6, '02.2025'],
        ['yyyy/mm', '.', '2024.12', 6, '2024.01'],
        ['yyyy', '.', '2024', 2, '2025'],
        ['dd/mm/yyyy', ' / ', '31 / 01 / 2024', 6, '29 / 02 / 2024'],
    ] satisfies Array<[MaskitoDateParams['mode'], string, string, number, string]>)(
        'supports %s with %s',
        (mode, separator, value, position, expected) => {
            setup(value, {mode, separator});
            press(position);
            expect(input.value).toBe(expected);
        },
    );

    it('derives segments from locale', () => {
        setup('01/31/2024', {locale: 'en-US', mode: undefined});
        press(1);
        expect(input.value).toBe('02/29/2024');
    });

    it('supports custom steps and repeated key presses', () => {
        setup('29.01.2024', {step: 2});
        press(1);
        expect(input.value).toBe('31.01.2024');
        press(1);
        expect(input.value).toBe('02.01.2024');
        press(1, 'ArrowDown');
        expect(input.value).toBe('31.01.2024');
    });

    it.each([
        ['15.06.2024', 1, 'ArrowUp', '15.06.2024'],
        ['10.06.2024', 1, 'ArrowDown', '10.06.2024'],
        ['15.06.2024', 4, 'ArrowUp', '15.06.2024'],
        ['10.06.2024', 8, 'ArrowDown', '10.06.2024'],
    ])('respects min/max for %s', (value, position, key, expected) => {
        setup(value, {min: new Date(2024, 5, 10), max: new Date(2024, 5, 15)});
        press(position, key);
        expect(input.value).toBe(expected);
    });

    it.each([undefined, 0, -1, 0.5, Number.NaN, Infinity])(
        'disables stepping for step %s',
        (step) => {
            setup('15.06.2024', {step});
            expect(press(1).defaultPrevented).toBe(false);
            expect(input.value).toBe('15.06.2024');
        },
    );

    it.each(['readOnly', 'disabled'] as const)(
        'does not modify %s inputs',
        (property) => {
            setup('15.06.2024');
            input[property] = true;
            expect(press(1).defaultPrevented).toBe(false);
            expect(input.value).toBe('15.06.2024');
        },
    );

    it('keeps the caret at the selection start and emits one bubbling input event', () => {
        setup('15.06.2024');
        input.setSelectionRange(3, 5);
        let events = 0;
        const listener = (): void => {
            events++;
        };

        document.body.addEventListener('input', listener);
        input.dispatchEvent(
            new KeyboardEvent('keydown', {key: 'ArrowUp', bubbles: true}),
        );
        document.body.removeEventListener('input', listener);
        expect(input.value).toBe('15.07.2024');
        expect([input.selectionStart, input.selectionEnd]).toEqual([3, 3]);
        expect(events).toBe(1);
    });

    it.each(
        ['altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'isComposing'].flatMap((property) =>
            ['ArrowUp', 'ArrowDown'].map((key): [string, string] => [property, key]),
        ),
    )('ignores %s with %s', (property, key) => {
        setup('15.06.2024');
        input.setSelectionRange(3, 5);

        const event = new KeyboardEvent('keydown', {
            key,
            [property]: true,
            bubbles: true,
            cancelable: true,
        });

        input.dispatchEvent(event);
        expect(input.value).toBe('15.06.2024');
        expect([input.selectionStart, input.selectionEnd]).toEqual([3, 5]);
        expect(event.defaultPrevented).toBe(false);
    });

    it('does not intercept navigation keys or events after destroy', () => {
        setup('15.06.2024');

        for (const key of ['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']) {
            expect(press(1, key).defaultPrevented).toBe(false);
        }

        mask.destroy();
        expect(press(1).defaultPrevented).toBe(false);
        expect(input.value).toBe('15.06.2024');
    });
});
