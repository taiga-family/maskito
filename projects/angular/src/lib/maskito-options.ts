import {InjectionToken} from '@angular/core';
import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';

export const MASKITO_OPTIONS = new InjectionToken<MaskitoOptions>(
    '[MASKITO_OPTIONS] Default parameters for MaskitoDirective',
    {
        factory: () => MASKITO_DEFAULT_OPTIONS,
    },
);
