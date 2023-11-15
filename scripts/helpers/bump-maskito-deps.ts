import {isMaskitoPackageName} from './is-maskito-package-name';

export function bumpMaskitoDeps({
    deps,
    prevVersion,
    newVersion,
    isPeerDependency,
    ignores,
}: {
    prevVersion: string;
    newVersion: string;
    deps: Record<string, Record<string, unknown> | string>;
    isPeerDependency?: boolean;
    ignores: string[];
}): void {
    Object.keys(deps)
        .filter(key => isMaskitoPackageName(key, ignores))
        .forEach(key => {
            if (typeof deps[key] === 'string') {
                deps[key] = isPeerDependency
                    ? (deps[key] as string)?.replace(prevVersion, newVersion)
                    : `^${newVersion}`;
            } else if (Object.prototype.hasOwnProperty.call(deps[key], 'requires')) {
                bumpMaskitoDeps({
                    deps: (deps[key] as Record<string, Record<string, string>>).requires,
                    isPeerDependency,
                    ignores,
                    prevVersion,
                    newVersion,
                });
            }
        });
}
