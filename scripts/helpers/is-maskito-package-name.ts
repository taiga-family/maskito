export function isMaskitoPackageName(name = '', ignores: string[] = []): boolean {
    return (
        (name?.startsWith('@maskito/') || name === 'maskito') && !ignores.includes(name)
    );
}
