import type {ErrorHandler} from '@angular/core';
import {Injectable} from '@angular/core';

// TODO
const KNOWN_ISSUES: string[] = [
    /**
     * ```
     * // mask.ts
     * export default {mask: '...'}
     *
     * // another-file.ts
     * import('./mask.ts', {with: {loader: 'text'}})
     *     .then(x => x.default)
     * ```
     * During SERVER side rendering, `x.default` invalidly equals to `{mask: '...'}` object.
     * During CLIENT side rendering, `x.default` correctly equals to raw file content.
     *
     * TODO(v6): no more relevant for Angular >= 20
     */
    'Input data should be a String',
    // Same here
    "Cannot find module 'react-hook-form' imported from", // TODO(v6): remove after Angular bump to >= 20
];

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
    public handleError(error: Error | string): void {
        const errorMessage = (typeof error === 'string' ? error : error.message) || '';

        if (KNOWN_ISSUES.some((issue) => errorMessage.includes(issue))) {
            return;
        }

        console.error(errorMessage);

        if (
            // Default environment variables for GitHub CI
            process.env.CI // https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables
        ) {
            process.exit(1);
        }
    }
}
