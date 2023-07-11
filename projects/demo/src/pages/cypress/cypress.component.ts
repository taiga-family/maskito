import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'cypress-doc-page',
    templateUrl: './cypress.template.html',
    styleUrls: ['./cypress.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CypressDocPageComponent {}
