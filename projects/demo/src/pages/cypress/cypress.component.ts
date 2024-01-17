import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';

import {TestDocExample1} from './examples/1-predicate/component';
import {TestDocExample2} from './examples/2-native-max-length/component';
import {TestDocExample3} from './examples/3-mirrored-prefix-postfix/component';
import {TestDocExample4} from './examples/4-runtime-postfix-changes/component';
import {TestDocExample5} from './examples/5-react-async-predicate/angular-wrapper';
import {TestDocExample6} from './examples/6-multi-character-prefix/component';

@Component({
    standalone: true,
    selector: 'cypress-doc-page',
    imports: [
        TuiAddonDocModule,
        TestDocExample1,
        TestDocExample2,
        TestDocExample3,
        TestDocExample4,
        TestDocExample5,
        TestDocExample6,
    ],
    templateUrl: './cypress.template.html',
    styleUrls: ['./cypress.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CypressDocPageComponent {}
