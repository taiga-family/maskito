import {ErrorHandler, NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {UniversalModule} from '@ng-web-apis/universal';

import {AppBrowserModule} from './app.browser.module';
import {AppComponent} from './app.component';
import {ServerErrorHandler} from './server-error-handler';

@NgModule({
    imports: [AppBrowserModule, ServerModule, UniversalModule],
    bootstrap: [AppComponent],
    providers: [{provide: ErrorHandler, useClass: ServerErrorHandler}],
})
export class AppServerModule {}
