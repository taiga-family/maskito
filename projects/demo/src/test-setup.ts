import 'jest-preset-angular/setup-jest';
import '@ng-web-apis/universal/mocks';
import '@taiga-ui/testing/setup-jest';

import {getTestBed} from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    {teardown: {destroyAfterEach: false}},
);
