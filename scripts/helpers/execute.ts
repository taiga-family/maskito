import {CommonExecOptions, execSync} from 'child_process';

import {infoLog} from './colored-log';

export function execute(shell: string, options?: Partial<CommonExecOptions>): string {
    infoLog(`ᐅ ${shell}`);

    return execSync(
        shell,
        options ?? {
            stdio: 'inherit',
            encoding: 'utf8',
        },
    )
        ?.toString()
        .trim();
}
