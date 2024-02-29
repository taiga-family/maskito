import {Pipe, PipeTransform} from '@angular/core';
import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';

@Pipe({
    standalone: true,
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
