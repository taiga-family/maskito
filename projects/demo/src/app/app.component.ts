import {ViewportScroller} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {ResizeObserverService} from '@ng-web-apis/resize-observer';
import {TUI_DOC_PAGE_LOADED, TuiDocMain} from '@taiga-ui/addon-doc';
import {tuiInjectElement} from '@taiga-ui/cdk';
import {TuiLink} from '@taiga-ui/core';
import {debounceTime, map, startWith} from 'rxjs';

@Component({
    selector: 'app',
    imports: [RouterLink, TuiDocMain, TuiLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ResizeObserverService,
        {
            provide: TUI_DOC_PAGE_LOADED,
            useFactory: () => {
                const host = tuiInjectElement();

                return inject(ResizeObserverService).pipe(
                    startWith(null),
                    debounceTime(0), // Synchronous scrollIntoView (after click) does not work https://stackoverflow.com/a/56971002
                    map(() => {
                        const exampleElements = Array.from(
                            host.querySelectorAll('tui-doc-example'),
                        );
                        const codeElements = Array.from(
                            host.querySelectorAll('tui-doc-code'),
                        );

                        return (
                            exampleElements.every((el) =>
                                el.querySelector('.t-example'),
                            ) && codeElements.every((el) => el.querySelector('.t-code'))
                        );
                    }),
                    takeUntilDestroyed(),
                );
            },
        },
    ],
})
export class App {
    protected readonly stackblitzStarterPath = `/${DemoPath.Stackblitz}`;

    constructor() {
        inject(ViewportScroller).setOffset([0, 64]);
    }
}
