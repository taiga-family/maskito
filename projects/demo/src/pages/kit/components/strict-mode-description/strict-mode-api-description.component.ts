import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    selector: 'strict-mode-api-description',
    template: `
        <p>
            In
            <code>strict</code>
            mode the date is autocorrected (i.e. there will never be an incorrect date in
            this field).
        </p>
        <p class="tui-space_bottom-0">
            <strong>Default:</strong>
            <code>true</code>
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrictModeApiDescriptionComponent {}
