import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TuiAddonDoc, TuiMarkdownPipe} from '@taiga-ui/addon-doc';

@Component({
    standalone: true,
    selector: 'changelog',
    imports: [TuiAddonDoc, TuiMarkdownPipe],
    templateUrl: './changelog.template.html',
    styleUrls: ['./changelog.style.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangelogComponent {
    protected readonly changelog$ = import('../../../../../../CHANGELOG.md?raw');
}
