export function splitIntoChunks(value: string, chunkSize: number): string[] {
    return value.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
}
