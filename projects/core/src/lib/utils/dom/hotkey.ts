export const enum HotkeyModifier {
    CTRL = 0b0001,
    ALT = 0b0010,
    SHIFT = 0b0100,
    META = 0b1000,
}

// TODO add variants that can be processed correctly
export const enum HotkeyCode {
    Y = 89,
    Z = 90,
}

/**
 * Checks if the passed keyboard event match the required hotkey.
 *
 * We intentionally use legacy {@link KeyboardEvent#keyCode `keyCode`} property. It is more
 * "keyboard-layout"-independent than {@link KeyboardEvent#key `key`} or {@link KeyboardEvent#code `code`} properties.
 *
 * @example
 * input.addEventListener('keydown', (event) => {
 *     if (isHotkey(event, HotkeyModifier.CTRL | HotkeyModifier.SHIFT, HotkeyCode.Z)) {
 *         // redo hotkey pressed
 *     }
 * })
 *
 * @see {@link https://github.com/Tinkoff/maskito/issues/315 `KeyboardEvent#code` issue}
 *
 * @return will return `true` only if the {@linkcode HotkeyCode} matches and only the necessary
 * {@link HotkeyModifier modifiers} have been pressed
 */
export function isHotkey(
    event: KeyboardEvent,
    modifiers: HotkeyModifier,
    hotkeyCode: HotkeyCode,
): boolean {
    return (
        event.ctrlKey === !!(modifiers & HotkeyModifier.CTRL) &&
        event.altKey === !!(modifiers & HotkeyModifier.ALT) &&
        event.shiftKey === !!(modifiers & HotkeyModifier.SHIFT) &&
        event.metaKey === !!(modifiers & HotkeyModifier.META) &&
        event.keyCode === hotkeyCode
    );
}
