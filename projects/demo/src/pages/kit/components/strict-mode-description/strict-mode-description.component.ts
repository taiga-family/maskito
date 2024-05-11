import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    selector: 'strict-mode-description',
    templateUrl: './strict-mode-description.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrictModeDescriptionComponent {}
