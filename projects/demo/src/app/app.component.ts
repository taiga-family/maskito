import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';
import {TUI_SANITIZER} from '@taiga-ui/legacy';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer,
        },
    ],
})
export class AppComponent {
    protected readonly stackblitzStarterPath = `/${DemoPath.Stackblitz}`;
}
