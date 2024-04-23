import type {ErrorHandler} from '@angular/core';
import {Injectable} from '@angular/core';
import {hasFlag} from 'scripts/helpers/argv';

// TODO
const KNOWN_ISSUES: string[] = [
    'requestAnimationFrame is not defined', // hljs
    'TypeError: Failed to parse URL from assets', // https://github.com/taiga-family/taiga-ui/issues/4063
];

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
    public handleError(error: Error | string): void {
        const errorMessage = (typeof error === 'string' ? error : error.message) || '';

        if (KNOWN_ISSUES.some(issue => errorMessage.includes(issue))) {
            return;
        }

        console.error(errorMessage);

        if (hasFlag('--ci')) {
            process.exit(1);
        }
    }
}
