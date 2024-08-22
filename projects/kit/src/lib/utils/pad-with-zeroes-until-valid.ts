const ALL_ZEROES_RE = /^0+$/;

export function padWithZeroesUntilValid(
    segmentValue: string,
    paddedMaxValue: string,
    prefixedZeroesCount = 0,
): {prefixedZeroesCount: number; validatedSegmentValue: string} {
    const paddedSegmentValue = segmentValue.padEnd(paddedMaxValue.length, '0');

    if (Number(paddedSegmentValue) <= Number(paddedMaxValue)) {
        return {validatedSegmentValue: segmentValue, prefixedZeroesCount};
    }

    if (paddedSegmentValue.endsWith('0')) {
        // 00:|00 => Type 9 => 00:09|
        return padWithZeroesUntilValid(
            `0${segmentValue.slice(0, paddedMaxValue.length - 1)}`,
            paddedMaxValue,
            prefixedZeroesCount + 1,
        );
    }

    const valueWithoutLastChar = segmentValue.slice(0, paddedMaxValue.length - 1);

    if (ALL_ZEROES_RE.exec(valueWithoutLastChar)) {
        return {validatedSegmentValue: '', prefixedZeroesCount};
    }

    // |19:00 => Type 2 => 2|0:00
    return padWithZeroesUntilValid(
        `${valueWithoutLastChar}0`,
        paddedMaxValue,
        prefixedZeroesCount,
    );
}
