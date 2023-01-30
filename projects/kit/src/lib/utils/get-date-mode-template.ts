import {MaskitoDateMode} from '../types';

export function getDateModeTemplate(
    dateMode: MaskitoDateMode,
    separator: string,
): string {
    return dateMode.split('/').join(separator);
}
