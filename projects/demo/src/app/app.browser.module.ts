import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiModeModule} from '@taiga-ui/core';
import {MarkdownModule} from 'ngx-markdown';

import {AppComponent} from './app.component';
import {APP_PROVIDERS} from './app.providers';
import {AppRoutingModule} from './app.routes';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'demo',
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            sanitize: SecurityContext.NONE,
        }),
        TuiAddonDoc,
        TuiLink,
        TuiModeModule,
    ],
    declarations: [AppComponent],
    providers: APP_PROVIDERS,
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
