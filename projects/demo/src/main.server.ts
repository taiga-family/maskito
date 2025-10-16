import type {ApplicationRef} from '@angular/core';
import {ErrorHandler, mergeApplicationConfig} from '@angular/core';
import type {BootstrapContext} from '@angular/platform-browser';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideServerRendering} from '@angular/platform-server';
import type {ServerRoute} from '@angular/ssr';
import {provideServerRouting, RenderMode} from '@angular/ssr';
import {DemoPath} from '@demo/constants';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';

import {App} from './app/app.component';
import {APP_CONFIG} from './app/app.config';
import {ROUTES} from './app/app.routes';
import {ServerErrorHandler} from './app/server-error-handler';

/* eslint-disable @typescript-eslint/require-await */

const serverConfig = mergeApplicationConfig(APP_CONFIG, {
    providers: [
        provideServerRendering(),
        provideServerRouting(
            ROUTES.map((route) => {
                const path = route.path ?? '';

                if (path === DemoPath.Angular) {
                    return withTabs(path, ['Setup']);
                }

                if (path === DemoPath.Plugins) {
                    return withTabs(path, ['Built-in_core_plugins']);
                }

                if (path.startsWith('kit') || path.startsWith('addons')) {
                    return withTabs(path, ['API']);
                }

                return {
                    path,
                    renderMode: RenderMode.Prerender,
                    async getPrerenderParams() {
                        return [];
                    },
                };
            }),
        ),
        UNIVERSAL_PROVIDERS,
        {provide: ErrorHandler, useClass: ServerErrorHandler},
    ],
});

function withTabs(path: string, tabs: string[]): ServerRoute {
    return {
        path: `${path}/:tab`,
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() {
            return tabs.map((tab) => ({tab}));
        },
    };
}

export default async (context: BootstrapContext): Promise<ApplicationRef> =>
    bootstrapApplication(App, serverConfig, context);
