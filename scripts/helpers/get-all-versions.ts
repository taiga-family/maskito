import {execSync} from 'child_process';

export function getAllVersions(name: string): string[] {
    const versions: string[] | string = JSON.parse(
        execSync(`npm view ${name} versions --json || echo "[]"`).toString(),
    );

    return Array.isArray(versions) ? versions : [versions];
}
