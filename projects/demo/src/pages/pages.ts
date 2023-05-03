import {DemoPath} from '@demo/constants';
import {TuiDocPages} from '@taiga-ui/addon-doc';

export const DEMO_PAGES: TuiDocPages = [
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
            'core, concepts, preprocessor, postprocessor, processor, pipe, maskitoPipe, element, state, elementState',
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
        section: 'JS Frameworks',
        title: 'Angular',
        route: DemoPath.Angular,
        keywords: `ng, angular, framework, addon`,
    },
    {
        section: 'JS Frameworks',
        title: 'React',
        route: DemoPath.React,
        keywords: `react, framework, addon`,
    },
    {
        section: 'Kit',
        title: 'Number',
        route: DemoPath.Number,
        keywords: `digit, number, money, mask, kit, generator`,
    },
    {
        section: 'Kit',
        title: 'Time',
        route: DemoPath.Time,
        keywords: `time, hour, minute, second, mask, kit, generator`,
    },
    {
        section: 'Kit',
        title: 'Date',
        route: DemoPath.Date,
        keywords: `date, day, month, year, mask, kit, generator`,
    },
    {
        section: 'Kit',
        title: 'DateRange',
        route: DemoPath.DateRange,
        keywords: `date, day, month, year, mask, range, kit, generator`,
    },
    {
        section: 'Kit',
        title: 'DateTime',
        route: DemoPath.DateTime,
        keywords: `date, day, month, year, mask, time, date-time, hour, minute, second, kit, generator`,
    },
    {
        section: 'Recipes',
        title: 'Card',
        route: DemoPath.Card,
        keywords: `card, credit, cvv, debit, mask, recipe`,
    },
    {
        section: 'Recipes',
        title: 'Phone',
        route: DemoPath.Phone,
        keywords: `phone, mobile, tel, telephone, mask, recipe`,
    },
    {
        section: 'Recipes',
        title: 'Textarea',
        route: DemoPath.Textarea,
        keywords: `textarea, latin, mask, recipe`,
    },
    {
        section: 'Recipes',
        title: 'With prefix',
        route: DemoPath.Prefix,
        keywords: `prefix, before, recipe`,
    },
    {
        section: 'Recipes',
        title: 'With postfix',
        route: DemoPath.Postfix,
        keywords: `postfix, after, percent, am, pm, recipe`,
    },
    {
        section: 'Other',
        title: 'Browser support',
        route: DemoPath.BrowserSupport,
        keywords: `chrome, safari, ie, edge, firefox, browser, support`,
    },
    {
        section: 'Other',
        title: 'Changelog',
        route: DemoPath.Changelog,
        keywords: `changelog, release, version, history`,
    },
];
