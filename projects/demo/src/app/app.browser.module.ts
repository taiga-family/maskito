import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiDocMainModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiModeModule} from '@taiga-ui/core';
import {MarkdownModule} from 'ngx-markdown';

import {AppComponent} from './app.component';
import {APP_PROVIDERS} from './app.providers';
import {AppRoutingModule} from './app.routes';
import {LogoModule} from './modules/logo/logo.module';
import {SandboxModule} from './modules/sandbox/sandbox.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'demo',
        }),
        AppRoutingModule,
        SandboxModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LogoModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            sanitize: SecurityContext.NONE,
        }),
        TuiDocMainModule,
        TuiLinkModule,
        TuiModeModule,
    ],
    declarations: [AppComponent],
    providers: APP_PROVIDERS,
})
export class AppBrowserModule {}
