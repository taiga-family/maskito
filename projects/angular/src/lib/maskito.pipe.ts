import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';
import type {MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_OPTIONS, maskitoTransform} from '@maskito/core';

@Pipe({
    name: 'maskito',
})
export class MaskitoPipe implements PipeTransform {
    public transform(value: unknown, maskitoOptions: MaskitoOptions | null): string {
        return maskitoTransform(
            String(value ?? ''),
            maskitoOptions ?? MASKITO_DEFAULT_OPTIONS,
        );
    }
}
