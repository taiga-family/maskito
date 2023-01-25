import {ErrorHandler, Injectable} from '@angular/core';
import {hasFlag} from 'scripts/helpers/argv';

const KNOWN_ISSUES: string[] = [];

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
