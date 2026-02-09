import {DemoPath} from '@demo/constants';
import type {TuiDocRoutePages} from '@taiga-ui/addon-doc';

export const DEMO_PAGES: TuiDocRoutePages = [
    {
        section: 'Getting started',
        title: 'What is Maskito?',
        route: DemoPath.WhatIsMaskito,
        keywords: 'getting, started, what, is, maskito',
    },
    {
        section: 'Getting started',
        title: 'Maskito libraries',
        route: DemoPath.MaskitoLibraries,
        keywords: 'install, package, packages, maskito, npm, setup, explore, ecosystem',
    },
    {
        section: 'Core concepts',
        title: 'Overview',
        route: DemoPath.CoreConceptsOverview,
        keywords: 'core, concepts, overview',
    },
    {
        section: 'Core concepts',
        title: 'Mask expression',
        route: DemoPath.MaskExpression,
        keywords: 'core, concepts, mask, expression, reg, exp, fixed',
    },
    {
        section: 'Core concepts',
        title: 'Element state',
        route: DemoPath.ElementState,
        keywords: 'core, concepts, element, state',
    },
    {
        section: 'Core concepts',
        title: 'Processors',
        route: DemoPath.Processors,
        keywords:
            'core, concepts, preprocessor, postprocessor, processor, element, state, elementState',
    },
    {
        section: 'Core concepts',
        title: 'Plugins',
        route: DemoPath.Plugins,
        keywords: 'core, concepts, extension, event, focus, blur',
    },
    {
        section: 'Core concepts',
        title: 'Overwrite mode',
        route: DemoPath.OverwriteMode,
        keywords: 'core, concepts, overwrite, mode, shift, replace',
    },
    {
        section: 'Core concepts',
        title: 'Transformer',
        route: DemoPath.Transformer,
        keywords: 'core, concepts, programmatic, patch, set, update, value',
    },
    {
        section: 'Frameworks',
        title: 'Angular',
        route: DemoPath.Angular,
        keywords: 'ng, angular, framework, addon',
    },
    {
        section: 'Frameworks',
        title: 'React',
        route: DemoPath.React,
        keywords: 'react, framework, addon',
    },
    {
        section: 'Frameworks',
        title: 'Vue',
        route: DemoPath.Vue,
        keywords: 'vue, framework, addon',
    },
    {
        section: 'Kit',
        title: 'Number',
        route: DemoPath.Number,
        keywords: 'digit, number, money, mask, kit, generator, big, int, integer, bigint',
    },
    {
        section: 'Kit',
        title: 'Time',
        route: DemoPath.Time,
        keywords: 'time, hour, minute, second, mask, kit, generator',
    },
    {
        section: 'Kit',
        title: 'Date',
        route: DemoPath.Date,
        keywords: 'date, day, month, year, mask, kit, generator',
    },
    {
        section: 'Kit',
        title: 'DateRange',
        route: DemoPath.DateRange,
        keywords: 'date, day, month, year, mask, range, kit, generator',
    },
    {
        section: 'Kit',
        title: 'DateTime',
        route: DemoPath.DateTime,
        keywords:
            'date, day, month, year, mask, time, date-time, hour, minute, second, kit, generator',
    },
    {
        section: 'Kit',
        title: 'List of Plugins',
        route: DemoPath.KitPlugins,
        keywords: 'reject, caret, guard, event, handler, focus, blur, selection',
    },
    {
        section: 'Addons',
        title: '@maskito/phone',
        route: DemoPath.PhonePackage,
        keywords: 'phone, libphonenumber, international, generator',
    },
    {
        section: 'Recipes',
        title: 'Card',
        route: DemoPath.Card,
        keywords: 'card, credit, cvv, debit, mask, recipe',
    },
    {
        section: 'Recipes',
        title: 'Phone',
        route: DemoPath.Phone,
        keywords: 'phone, mobile, tel, telephone, mask, recipe',
    },
    {
        section: 'Recipes',
        title: 'Textarea',
        route: DemoPath.Textarea,
        keywords: 'textarea, latin, mask, recipe',
    },
    {
        section: 'Recipes',
        title: 'ContentEditable',
        route: DemoPath.ContentEditable,
        keywords: 'content, editable, contenteditable, contentEditable, mask, recipe',
    },
    {
        section: 'Recipes',
        title: 'With prefix',
        route: DemoPath.Prefix,
        keywords: 'prefix, before, recipe',
    },
    {
        section: 'Recipes',
        title: 'With postfix',
        route: DemoPath.Postfix,
        keywords: 'postfix, after, percent, am, pm, recipe',
    },
    {
        section: 'Recipes',
        title: 'With placeholder',
        route: DemoPath.Placeholder,
        keywords: 'guide, placeholder, fill, recipe',
    },
    {
        section: 'Recipes',
        title: 'Network address',
        route: DemoPath.NetworkAddress,
        keywords: 'ipv6, ipv4, ip, mac, address, network, recipe',
    },
    {
        section: 'Other',
        title: 'Browser support',
        route: DemoPath.BrowserSupport,
        keywords: 'chrome, safari, ie, edge, firefox, browser, support',
    },
    {
        section: 'Other',
        title: 'Supported <input /> types',
        route: DemoPath.SupportedInputTypes,
        keywords:
            'input, type, text, password, search, tel, url, email, number, date, month',
    },
    {
        section: 'Other',
        title: 'Maskito in Real World Form',
        route: DemoPath.RealWorldForm,
        keywords: 'browser, autofill, showcase, in, action, demo',
    },
    {
        section: 'Other',
        title: 'Changelog',
        route: 'https://github.com/taiga-family/maskito/blob/main/CHANGELOG.md',
        target: '_blank',
        keywords: 'release, change, changelog, archive, history',
    },
];
