import {type realPress} from 'cypress-real-events/commands/realPress';

export function range(from: number, to: number): number[] {
    return Array.from({length: to - from + 1}).map((_, i) => from + i);
}

export function withCaretLabel(value: string, caretIndex: number): string {
    return `${value.slice(0, caretIndex)}|${value.slice(caretIndex)}`;
}

export function repeatKey<T extends Parameters<typeof realPress>[0]>(
    key: T,
    times: number,
): readonly T[] {
    return Array.from({length: times}).map(() => key);
}
