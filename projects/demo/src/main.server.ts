import type {ApplicationRef} from '@angular/core';
import {ErrorHandler, mergeApplicationConfig} from '@angular/core';
import type {BootstrapContext} from '@angular/platform-browser';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideServerRendering} from '@angular/platform-server';
import {provideServerRouting, RenderMode} from '@angular/ssr';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';

import {App} from './app/app.component';
import {APP_CONFIG} from './app/app.config';
import {ServerErrorHandler} from './app/server-error-handler';

const serverConfig = mergeApplicationConfig(APP_CONFIG, {
    providers: [
        provideServerRendering(),
        provideServerRouting([
            {
                path: '**',
                renderMode: RenderMode.Prerender,
            },
        ]),
        UNIVERSAL_PROVIDERS,
        {provide: ErrorHandler, useClass: ServerErrorHandler},
    ],
});

export default async (context: BootstrapContext): Promise<ApplicationRef> =>
    bootstrapApplication(App, serverConfig, context);
