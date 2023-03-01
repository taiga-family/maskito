import {tuiIsString} from '@taiga-ui/cdk/utils';

export function bumpMaskitoVersionInPackageJson(
    packageJson: Record<string, unknown>,
    version: string,
): void {
    if (`version` in packageJson && tuiIsString(packageJson[`version`])) {
        packageJson[`version`] = version;
    }
}
