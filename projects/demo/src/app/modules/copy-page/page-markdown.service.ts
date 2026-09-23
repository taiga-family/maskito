import {inject, Injectable, type Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PageMarkdownService {
    private readonly router = inject(Router);

    public readonly url: Signal<string> = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.resolve()),
            startWith(this.resolve()),
            distinctUntilChanged(),
        ),
        {requireSync: true},
    );

    private resolve(): string {
        const [url = ''] = this.router.url.split(/[?#]/);
        const page = url.replace(/\/$/, '');
        let route = this.router.routerState.snapshot.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        // Tabbed pages live under a ':tab' child (see `tuiProvideRoutePageTab`) but share one base .md.
        const base =
            route.routeConfig?.path === ':tab'
                ? page.slice(0, page.lastIndexOf('/'))
                : page;

        // The empty route renders the very same component as `DemoPath.WhatIsMaskito`.
        return `${base || `/${DemoPath.WhatIsMaskito}`}.md`;
    }
}
