export function range(from: number, to: number): number[] {
    return new Array(to - from + 1).fill(null).map((_, i) => from + i);
}

export function withCaretLabel(value: string, caretIndex: number): string {
    return `${value.slice(0, caretIndex)}|${value.slice(caretIndex)}`;
}
