import {ErrorHandler, Injectable} from '@angular/core';
import {hasFlag} from 'scripts/helpers/argv';

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
    handleError(error: unknown) {
        console.error(error);

        if (hasFlag('--ci')) {
            process.exit(1);
        }
    }
}
