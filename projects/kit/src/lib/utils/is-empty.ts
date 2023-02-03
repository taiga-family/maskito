export function isEmpty(
    entity: boolean | number | object | string | null | undefined,
): boolean {
    return !entity || (typeof entity === 'object' && Object.keys(entity).length === 0);
}
