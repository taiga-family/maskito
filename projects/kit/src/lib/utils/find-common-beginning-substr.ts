export function findCommonBeginningSubstr(a: string, b: string): string {
    let res = '';

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return res;
        }

        res += a[i];
    }

    return res;
}
