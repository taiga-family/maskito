import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {WaResizeObserverService} from '@ng-web-apis/resize-observer';
import {TUI_DOC_PAGE_LOADED, TuiDocMain} from '@taiga-ui/addon-doc';
import {tuiInjectElement, tuiZoneOptimized} from '@taiga-ui/cdk';
import {TUI_DARK_MODE, TuiButton, TuiLink} from '@taiga-ui/core';
import {distinctUntilChanged, map, shareReplay, startWith} from 'rxjs';

@Component({
    selector: 'app',
    imports: [RouterLink, TuiButton, TuiDocMain, TuiLink],
    templateUrl: './app.component.html',
    styleUrl: './app.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        WaResizeObserverService,
        {
            provide: TUI_DOC_PAGE_LOADED,
            useFactory: () => {
                const host = tuiInjectElement();

                return inject(WaResizeObserverService).pipe(
                    map(([entry]) => entry?.contentRect.height ?? 0),
                    distinctUntilChanged(),
                    startWith(0),
                    map((hostHeight) => {
                        const exampleElements = Array.from(
                            host.querySelectorAll('tui-doc-example'),
                        );

                        const codeElements = Array.from(
                            host.querySelectorAll('tui-doc-code'),
                        );

                        return (
                            Boolean(hostHeight) &&
                            exampleElements.every((el) =>
                                el.querySelector('.t-demo')?.matches(':not(:empty)'),
                            ) &&
                            codeElements.every((el) => el.querySelector('.t-code'))
                        );
                    }),
                    shareReplay(1),
                    tuiZoneOptimized(),
                    takeUntilDestroyed(),
                );
            },
        },
    ],
})
export class App {
    protected readonly darkMode = inject(TUI_DARK_MODE);
    protected readonly stackblitzStarterPath = `/${DemoPath.Stackblitz}`;
}
