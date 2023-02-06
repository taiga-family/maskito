export function isEmpty(entity: object | null | undefined): boolean {
    return !entity || (typeof entity === 'object' && Object.keys(entity).length === 0);
}
