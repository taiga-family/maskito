import {HotkeyCode, HotkeyModifier, isHotkey} from './hotkey';

export function isRedo(event: KeyboardEvent): boolean {
    return (
        isHotkey(event, HotkeyModifier.CTRL, HotkeyCode.Y) || // Windows
        isHotkey(event, HotkeyModifier.CTRL | HotkeyModifier.SHIFT, HotkeyCode.Z) || // Windows & Android
        isHotkey(event, HotkeyModifier.META | HotkeyModifier.SHIFT, HotkeyCode.Z) // macOS & iOS
    );
}

export function isUndo(event: KeyboardEvent): boolean {
    return (
        isHotkey(event, HotkeyModifier.CTRL, HotkeyCode.Z) || // Windows & Android
        isHotkey(event, HotkeyModifier.META, HotkeyCode.Z) // macOS & iOS
    );
}
