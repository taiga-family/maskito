import 'jest-preset-angular/setup-jest';
import '@taiga-ui/testing/setup-jest';

import {enableProdMode} from '@angular/core';

/**
 * - https://github.com/angular/angular/issues/54096
 * - https://github.com/thymikee/jest-preset-angular/issues/2582
 */
enableProdMode();
