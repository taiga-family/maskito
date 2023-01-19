import {DemoPath} from '@demo/routes';
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
        title: 'Browser support',
        route: DemoPath.BrowserSupport,
        keywords: `chrome, safari, ie, edge, firefox, browser, support`,
    },
];
