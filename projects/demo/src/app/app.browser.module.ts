import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiDocMainModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiModeModule} from '@taiga-ui/core';

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
        TuiDocMainModule,
        LogoModule,
        TuiLinkModule,
        TuiModeModule,
    ],
    declarations: [AppComponent],
    providers: APP_PROVIDERS,
})
export class AppBrowserModule {}
