export function padWithZeroesUntilValid(
    segmentValue: string,
    paddedMaxValue: string,
    prefixedZeroesCount = 0,
): {prefixedZeroesCount: number; validatedSegmentValue: string} {
    if (
        Number(segmentValue.padEnd(paddedMaxValue.length, '0')) <= Number(paddedMaxValue)
    ) {
        return {validatedSegmentValue: segmentValue, prefixedZeroesCount};
    }

    if (segmentValue.endsWith('0')) {
        // 00:|00 => Type 9 => 00:09|
        return padWithZeroesUntilValid(
            `0${segmentValue.slice(0, paddedMaxValue.length - 1)}`,
            paddedMaxValue,
            prefixedZeroesCount + 1,
        );
    }

    // |19:00 => Type 2 => 2|0:00
    return padWithZeroesUntilValid(
        `${segmentValue.slice(0, paddedMaxValue.length - 1)}0`,
        paddedMaxValue,
        prefixedZeroesCount,
    );
}
