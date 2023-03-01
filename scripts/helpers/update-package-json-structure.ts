import {bumpMaskitoDeps} from './bump-maskito-deps';
import {bumpMaskitoVersionInPackageJson} from './bump-maskito-version-in-package-json';
import {isMaskitoPackageName} from './is-maskito-package-name';

function isObject<T extends Record<string, any>>(
    value: unknown,
): value is NonNullable<T> {
    return typeof value === `object` && !!value;
}

interface UpdatePackageJsonOptions {
    packageJson: Record<string, Record<string, any> | string>;
    prevVersion: string;
    newVersion: string;
    isPackageLockFile: boolean;
    ignores: string[];
}

export function updatePackageJsonStructure({
    packageJson,
    isPackageLockFile,
    ignores,
    prevVersion,
    newVersion,
}: UpdatePackageJsonOptions): void {
    const {name, dependencies, peerDependencies, devDependencies, packages} = packageJson;

    if (typeof name === 'string' && isMaskitoPackageName(name, ignores)) {
        bumpMaskitoVersionInPackageJson(packageJson, newVersion);
    }

    if (isObject(dependencies)) {
        bumpMaskitoDeps({deps: dependencies, prevVersion, newVersion, ignores});
    }

    if (isObject(peerDependencies)) {
        bumpMaskitoDeps({
            deps: peerDependencies,
            prevVersion,
            newVersion,
            isPeerDependency: true,
            ignores,
        });
    }

    if (isObject(devDependencies)) {
        bumpMaskitoDeps({deps: devDependencies, prevVersion, newVersion, ignores});
    }

    if (isPackageLockFile && isObject(packages)) {
        for (const packageLockJson of Object.values(packages)) {
            if (!isMaskitoPackageName(packageLockJson?.name, ignores)) {
                continue;
            }

            updatePackageJsonStructure({
                packageJson: packageLockJson,
                prevVersion,
                newVersion,
                isPackageLockFile: true,
                ignores,
            });
        }
    }
}
