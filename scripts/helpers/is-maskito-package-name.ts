export function isMaskitoPackageName(name: string = ``, ignores: string[]): boolean {
    return (
        (name?.startsWith(`@maskito/`) || name === `maskito`) && !ignores.includes(name)
    );
}
