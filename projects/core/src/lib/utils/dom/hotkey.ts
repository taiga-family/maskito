export const HotkeyModifier = {
    CTRL: 1 << 0,
    ALT: 1 << 1,
    SHIFT: 1 << 2,
    META: 1 << 3,
} as const;

// TODO add variants that can be processed correctly
export const HotkeyCode = {
    Y: 89,
    Z: 90,
} as const;

/**
 * Checks if the passed keyboard event match the required hotkey.
 *
 * @example
 * input.addEventListener('keydown', (event) => {
 *     if (isHotkey(event, HotkeyModifier.CTRL | HotkeyModifier.SHIFT, HotkeyCode.Z)) {
 *         // redo hotkey pressed
 *     }
 * })
 *
 * @return will return `true` only if the {@link HotkeyCode} matches and only the necessary
 * {@link HotkeyModifier modifiers} have been pressed
 */
export function isHotkey(
    event: KeyboardEvent,
    modifiers: (typeof HotkeyModifier)[keyof typeof HotkeyModifier],
    hotkeyCode: (typeof HotkeyCode)[keyof typeof HotkeyCode],
): boolean {
    return (
        event.ctrlKey === !!(modifiers & HotkeyModifier.CTRL) &&
        event.altKey === !!(modifiers & HotkeyModifier.ALT) &&
        event.shiftKey === !!(modifiers & HotkeyModifier.SHIFT) &&
        event.metaKey === !!(modifiers & HotkeyModifier.META) &&
        /**
         * We intentionally use legacy {@link KeyboardEvent#keyCode `keyCode`} property. It is more
         * "keyboard-layout"-independent than {@link KeyboardEvent#key `key`} or {@link KeyboardEvent#code `code`} properties.
         * @see {@link https://github.com/taiga-family/maskito/issues/315 `KeyboardEvent#code` issue}
         */
        // eslint-disable-next-line sonar/deprecation
        event.keyCode === hotkeyCode
    );
}
