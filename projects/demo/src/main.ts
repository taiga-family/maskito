import {bootstrapApplication} from '@angular/platform-browser';

import {App} from './app/app.component';
import {APP_CONFIG} from './app/app.config';

bootstrapApplication(App, APP_CONFIG).catch((err: unknown) => console.error(err));
