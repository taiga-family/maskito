const HotkeyCode = {Y: 89, Z: 90} as const;
const HotkeyModifier = {CTRL: 'ctrl', ALT: 'alt', SHIFT: 'shift', META: 'meta'} as const;

/**
 * @internal
 * Checks if the passed keyboard event match the required hotkey.
 *
 * @example
 * input.addEventListener('keydown', (event) => {
 *     if (isHotkey(event, [HotkeyModifier.CTRL, HotkeyModifier.SHIFT], HotkeyCode.Z)) {
 *         // redo hotkey pressed
 *     }
 * })
 *
 * @return will return `true` only if the {@link HotkeyCode} matches and only the necessary
 * {@link HotkeyModifier modifiers} have been pressed
 */
function isHotkey(
    event: KeyboardEvent,
    modifiers: ReadonlyArray<(typeof HotkeyModifier)[keyof typeof HotkeyModifier]>,
    hotkeyCode: (typeof HotkeyCode)[keyof typeof HotkeyCode],
): boolean {
    return (
        event.ctrlKey === modifiers.includes(HotkeyModifier.CTRL) &&
        event.altKey === modifiers.includes(HotkeyModifier.ALT) &&
        event.shiftKey === modifiers.includes(HotkeyModifier.SHIFT) &&
        event.metaKey === modifiers.includes(HotkeyModifier.META) &&
        /**
         * We intentionally use legacy {@link KeyboardEvent#keyCode `keyCode`} property. It is more
         * "keyboard-layout"-independent than {@link KeyboardEvent#key `key`} or {@link KeyboardEvent#code `code`} properties.
         * @see {@link https://github.com/taiga-family/maskito/issues/315 `KeyboardEvent#code` issue}
         */
        event.keyCode === hotkeyCode
    );
}

export function isRedo(event: KeyboardEvent): boolean {
    return (
        isHotkey(event, [HotkeyModifier.CTRL], HotkeyCode.Y) || // Windows
        isHotkey(event, [HotkeyModifier.CTRL, HotkeyModifier.SHIFT], HotkeyCode.Z) || // Windows & Android
        isHotkey(event, [HotkeyModifier.META, HotkeyModifier.SHIFT], HotkeyCode.Z) // macOS & iOS
    );
}

export function isUndo(event: KeyboardEvent): boolean {
    return (
        isHotkey(event, [HotkeyModifier.CTRL], HotkeyCode.Z) || // Windows & Android
        isHotkey(event, [HotkeyModifier.META], HotkeyCode.Z) // macOS & iOS
    );
}
