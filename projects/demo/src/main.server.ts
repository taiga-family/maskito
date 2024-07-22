import type {ApplicationRef} from '@angular/core';
import {ErrorHandler, importProvidersFrom, mergeApplicationConfig} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideServerRendering, ServerModule} from '@angular/platform-server';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';

import {App} from './app/app.component';
import {APP_CONFIG} from './app/app.config';
import {ServerErrorHandler} from './app/server-error-handler';

const serverConfig = mergeApplicationConfig(APP_CONFIG, {
    providers: [
        importProvidersFrom(ServerModule),
        provideServerRendering(),
        UNIVERSAL_PROVIDERS,
        {provide: ErrorHandler, useClass: ServerErrorHandler},
    ],
});

export default async (): Promise<ApplicationRef> =>
    bootstrapApplication(App, serverConfig);
