import type {MaskitoOptions} from '@maskito/core';

export interface UrlMaskParams {
    readonly allowRelative?: boolean;
    readonly httpsOnly?: boolean;
}

const ABSOLUTE_URL_MASK = /^(?!\/)\S*$/;
const URL_OR_RELATIVE_MASK = /^\S*$/;
const HTTPS_ONLY_MASK = /^(?:|h|ht|htt|http|https|https:|https:\/|https:\/\/\S*)$/i;
const HTTPS_ONLY_OR_RELATIVE_MASK =
    /^(?:|h|ht|htt|http|https|https:|https:\/|https:\/\/\S*|\/\S*)$/i;

export function maskitoUrl({
    allowRelative = false,
    httpsOnly = false,
}: UrlMaskParams = {}): MaskitoOptions {
    if (httpsOnly) {
        return {
            mask: allowRelative ? HTTPS_ONLY_OR_RELATIVE_MASK : HTTPS_ONLY_MASK,
        };
    }

    return {
        mask: allowRelative ? URL_OR_RELATIVE_MASK : ABSOLUTE_URL_MASK,
    };
}
