import {ErrorHandler, Injectable} from '@angular/core';
import {hasFlag} from 'scripts/helpers/argv';

// TODO
const KNOWN_ISSUES = [
    `Cannot read properties of undefined (reading 'type')`, // https://github.com/Tinkoff/taiga-ui/issues/3210
];

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
    handleError(error: Error): void {
        if (KNOWN_ISSUES.includes(error.message)) {
            return;
        }

        console.error(error);

        if (hasFlag('--ci')) {
            process.exit(1);
        }
    }
}
