import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAddonDoc, tuiRawLoad} from '@taiga-ui/addon-doc';
import {MarkdownModule} from 'ngx-markdown';
import {of, switchMap} from 'rxjs';

@Component({
    standalone: true,
    selector: 'changelog',
    imports: [TuiAddonDoc, MarkdownModule, AsyncPipe],
    templateUrl: './changelog.template.html',
    styleUrls: ['./changelog.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangelogComponent {
    protected readonly changelog$ = of(import('../../../../../../CHANGELOG.md?raw')).pipe(
        switchMap(tuiRawLoad),
    );
}
