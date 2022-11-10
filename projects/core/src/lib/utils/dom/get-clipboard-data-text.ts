const DEFAULT_FORMAT = `text/plain`;

/**
 * Gets text from data of clipboardEvent
 */
export function getClipboardDataText(
    event: ClipboardEvent,
    format: string = DEFAULT_FORMAT,
): string {
    return `clipboardData` in event && event.clipboardData !== null
        ? event.clipboardData.getData(format) ||
              event.clipboardData.getData(DEFAULT_FORMAT)
        : (event as any).target.ownerDocument.defaultView.clipboardData.getData(`text`);
}
