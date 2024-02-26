import {Directive, Input, NgModule} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';

import {MaskitoDirective} from './maskito.directive';
import {MaskitoPipe} from './maskito.pipe';

/**
 * @deprecated Just use `MaskitoDirective`, `MaskitoCVA` no longer needed.
 */
@Directive({
    standalone: true,
    selector: 'input[maskito], textarea[maskito]',
})
export class MaskitoCVA {
    @Input()
    maskito?: MaskitoOptions | null;
}

/**
 * @deprecated Use standalone `MaskitoDirective` and `MaskitoPipe` instead.
 * Learn more: https://maskito.dev/frameworks/angular
 * ___
 * TODO: Delete it in v3.0 (after Taiga UI 4.0 will be released and bumped in this repository).
 * Taiga UI (3.x.x) uses Maskito (1.x.x) <=> Maskito (2.x.x) uses Taiga UI (3.x.x) to build demo application.
 * Also, NPM workspaces create symlinks for `@maskito/*` inside `node_modules`.
 * All this together don't allow us to build Maskito's demo without this legacy module.
 * ___
 * > nx build demo
 * ```
 * ./node_modules/@taiga-ui/kit/fesm2015/taiga-ui-kit-components-input-date.js:465:29-42 -
 * Error: export 'MaskitoModule' (imported as 'MaskitoModule') was not found in '@maskito/angular'
 * (possible exports: MaskitoCVA, MaskitoDirective, MaskitoPipe)
 * ```
 */
@NgModule({
    imports: [MaskitoDirective, MaskitoCVA, MaskitoPipe],
    exports: [MaskitoDirective, MaskitoCVA, MaskitoPipe],
})
export class MaskitoModule {}
