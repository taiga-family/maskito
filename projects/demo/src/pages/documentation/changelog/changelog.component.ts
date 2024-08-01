import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAddonDoc, TuiDocMarkdownPipe} from '@taiga-ui/addon-doc';

@Component({
    standalone: true,
    selector: 'changelog',
    imports: [AsyncPipe, TuiAddonDoc, TuiDocMarkdownPipe],
    templateUrl: './changelog.template.html',
    styleUrls: ['./changelog.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Page {
    protected readonly changelog = import('../../../../../../CHANGELOG.md?raw');
}
