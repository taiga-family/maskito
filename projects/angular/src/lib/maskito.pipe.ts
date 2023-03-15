import {Pipe, PipeTransform} from '@angular/core';
import {MaskitoOptions, maskitoTransform} from '@maskito/core';

@Pipe({
    name: 'maskito',
})
export class MaskitoPipe implements PipeTransform {
    transform(value: unknown, maskitoOptions: MaskitoOptions): string {
        return maskitoTransform(String(value ?? ''), maskitoOptions);
    }
}
