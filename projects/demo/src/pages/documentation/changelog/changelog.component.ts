import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TuiDocPageModule, tuiRawLoad} from '@taiga-ui/addon-doc';
import {MarkdownModule} from 'ngx-markdown';
import {of, switchMap} from 'rxjs';

@Component({
    standalone: true,
    selector: 'changelog',
    imports: [TuiDocPageModule, MarkdownModule, AsyncPipe],
    templateUrl: './changelog.template.html',
    styleUrls: ['./changelog.style.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangelogComponent {
    readonly changelog$ = of(import('../../../../../../CHANGELOG.md?raw')).pipe(
        switchMap(tuiRawLoad),
    );
}
