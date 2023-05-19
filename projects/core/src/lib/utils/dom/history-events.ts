export function isRedo({ctrlKey, metaKey, shiftKey, code}: KeyboardEvent): boolean {
    return (
        (ctrlKey && code === 'KeyY') || // Windows
        (ctrlKey && shiftKey && code === 'KeyZ') || // Windows & Android
        (metaKey && shiftKey && code === 'KeyZ') // macOS & iOS
    );
}

export function isUndo({ctrlKey, metaKey, code}: KeyboardEvent): boolean {
    return (
        (ctrlKey && code === 'KeyZ') || // Windows & Android
        (metaKey && code === 'KeyZ') // macOS & iOS
    );
}
