import {ErrorHandler, Injectable} from '@angular/core';
import {hasFlag} from 'scripts/helpers/argv';

// TODO
const KNOWN_ISSUES: string[] = [
    'requestAnimationFrame is not defined', // hljs
    'TypeError: Failed to parse URL from assets', // https://github.com/Tinkoff/taiga-ui/issues/4063
];

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
    handleError(error: Error): void {
        if (KNOWN_ISSUES.some(issue => error.message.includes(issue))) {
            return;
        }

        console.error(error);

        if (hasFlag('--ci')) {
            process.exit(1);
        }
    }
}
