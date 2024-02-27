import {CHAR_COLON, CHAR_JP_COLON} from '../constants';

/**
 * Replace fullwidth colon with half width colon
 * @param fullWidthColon full width colon
 * @returns processed half width colon
 */
export function toHalfWidthColon(fullWidthColon: string): string {
    return fullWidthColon.replaceAll(new RegExp(CHAR_JP_COLON, 'g'), CHAR_COLON);
}
