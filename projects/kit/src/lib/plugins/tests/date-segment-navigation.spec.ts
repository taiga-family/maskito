import {afterEach, describe, expect, it} from '@jest/globals';
import {Maskito, type MaskitoOptions} from '@maskito/core';
import {
    maskitoDate,
    maskitoDateSegmentNavigation,
    maskitoWithPlaceholder,
} from '@maskito/kit';

const instances: Maskito[] = [];
const inputs: HTMLInputElement[] = [];

function setup(
    mode: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'mm/yy' | 'yyyy/mm/dd',
    value = '',
): HTMLInputElement {
    const input = document.createElement('input');
    const params = {mode, separator: '/'} as const;
    const mask = maskitoDate(params);
    const placeholder = maskitoWithPlaceholder(mode, true);
    const options: MaskitoOptions = {
        ...mask,
        preprocessors: [...placeholder.preprocessors, ...mask.preprocessors],
        postprocessors: [...mask.postprocessors, ...placeholder.postprocessors],
        // The placeholder caret guard blocks navigation into empty segments.
        plugins: [...placeholder.plugins.slice(1), maskitoDateSegmentNavigation(params)],
    };

    input.value = value;
    document.body.append(input);
    instances.push(new Maskito(input, options));
    inputs.push(input);
    input.focus();

    return input;
}

function key(input: HTMLInputElement, name: string, shiftKey = false): boolean {
    return input.dispatchEvent(
        new KeyboardEvent('keydown', {
            key: name,
            shiftKey,
            cancelable: true,
            bubbles: true,
        }),
    );
}

describe('maskitoDateSegmentNavigation', () => {
    afterEach(() => {
        instances.forEach((instance) => instance.destroy());
        inputs.forEach((input) => input.remove());
        instances.length = 0;
        inputs.length = 0;
    });

    it('selects and navigates segments, but does not trap Tab at the boundary', () => {
        const input = setup('dd/mm/yyyy');

        expect(input.value).toBe('dd/mm/yyyy');
        expect([input.selectionStart, input.selectionEnd]).toEqual([0, 2]);
        expect(key(input, 'Tab')).toBe(false);
        expect([input.selectionStart, input.selectionEnd]).toEqual([3, 5]);
        expect(key(input, 'ArrowRight')).toBe(false);
        expect([input.selectionStart, input.selectionEnd]).toEqual([6, 10]);
        expect(key(input, 'Tab')).toBe(true);
        expect(key(input, 'Tab', true)).toBe(false);
        expect([input.selectionStart, input.selectionEnd]).toEqual([3, 5]);
        expect(key(input, 'ArrowLeft')).toBe(false);
        expect([input.selectionStart, input.selectionEnd]).toEqual([0, 2]);
    });

    it('steps an empty day segment', () => {
        const input = setup('dd/mm/yyyy');

        key(input, 'ArrowUp');
        expect(input.value).toBe('01/mm/yyyy');
        key(input, 'ArrowDown');
        expect(input.value).toBe('31/mm/yyyy');
    });

    it('clamps the day when stepping January to February', () => {
        const input = setup('dd/mm/yyyy', '31/01/2026');

        input.setSelectionRange(3, 5);
        key(input, 'ArrowUp');

        expect(input.value).toBe('28/02/2026');
        expect([input.selectionStart, input.selectionEnd]).toEqual([3, 5]);
    });

    it('clamps leap day on year change', () => {
        const input = setup('dd/mm/yyyy', '29/02/2024');

        input.setSelectionRange(6, 10);
        key(input, 'ArrowDown');

        expect(input.value).toBe('28/02/2023');
    });

    it('does not change a partial date if day clamping is canceled', () => {
        const input = setup('dd/mm/yyyy', '31/01/yyyy');

        input.setSelectionRange(3, 5);
        input.addEventListener('beforeinput', (event) => {
            if (event.data === '29') {
                event.preventDefault();
            }
        });

        key(input, 'ArrowUp');

        expect(input.value).toBe('31/01/yyyy');
    });

    it('supports month-first dates', () => {
        const input = setup('mm/dd/yyyy', '01/31/2026');

        key(input, 'ArrowUp');
        expect(input.value).toBe('02/28/2026');
    });

    it('supports year-first dates', () => {
        const input = setup('yyyy/mm/dd', '2024/02/29');

        key(input, 'ArrowDown');
        expect(input.value).toBe('2023/02/28');
    });

    it('supports two-digit years', () => {
        const input = setup('mm/yy', '12/24');

        input.setSelectionRange(3, 5);
        key(input, 'ArrowUp');
        expect(input.value).toBe('12/25');
    });

    it('announces the active segment and removes the live region on destroy', () => {
        const input = setup('dd/mm/yyyy');
        const announcer = input.parentElement?.querySelector('[aria-live="polite"]');

        expect(announcer?.textContent).toBe('Day, empty');
        key(input, 'ArrowRight');
        expect(announcer?.textContent).toBe('Month, empty');

        instances.pop()?.destroy();
        expect(input.parentElement?.querySelector('[aria-live="polite"]')).toBeNull();
    });
});
