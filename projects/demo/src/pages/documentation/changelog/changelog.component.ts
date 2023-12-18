import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {tuiRawLoad} from '@taiga-ui/addon-doc';
import {of, switchMap} from 'rxjs';

@Component({
    selector: 'changelog',
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
