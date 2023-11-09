import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiDocMainModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiModeModule} from '@taiga-ui/core';
import {MarkdownModule} from 'ngx-markdown';

import {StackblitzEditButtonModule} from '../pages/stackblitz';
import {AppComponent} from './app.component';
import {APP_PROVIDERS} from './app.providers';
import {AppRoutingModule} from './app.routes';
import {DocExamplePrimaryTabsIconsModule} from './modules/example-primary-tabs-icons';
import {LogoModule} from './modules/logo/logo.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'demo',
        }),
        AppRoutingModule,
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
        StackblitzEditButtonModule,
        DocExamplePrimaryTabsIconsModule,
    ],
    declarations: [AppComponent],
    providers: APP_PROVIDERS,
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
