import {ErrorHandler, NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';

import {AppBrowserModule} from './app.browser.module';
import {AppComponent} from './app.component';
import {ServerErrorHandler} from './server-error-handler';

@NgModule({
    imports: [AppBrowserModule, ServerModule],
    providers: [
        UNIVERSAL_PROVIDERS,
        {provide: ErrorHandler, useClass: ServerErrorHandler},
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
