import {tuiIsObject, tuiIsString} from '@taiga-ui/cdk/utils';

import {bumpMaskitoDeps} from './bump-maskito-deps';
import {bumpMaskitoVersionInPackageJson} from './bump-maskito-version-in-package-json';
import {isMaskitoPackageName} from './is-maskito-package-name';

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

    if (tuiIsString(name) && isMaskitoPackageName(name, ignores)) {
        bumpMaskitoVersionInPackageJson(packageJson, newVersion);
    }

    if (tuiIsObject(dependencies)) {
        bumpMaskitoDeps({deps: dependencies, prevVersion, newVersion, ignores});
    }

    if (tuiIsObject(peerDependencies)) {
        bumpMaskitoDeps({
            deps: peerDependencies,
            prevVersion,
            newVersion,
            isPeerDependency: true,
            ignores,
        });
    }

    if (tuiIsObject(devDependencies)) {
        bumpMaskitoDeps({deps: devDependencies, prevVersion, newVersion, ignores});
    }

    if (isPackageLockFile && tuiIsObject(packages)) {
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
