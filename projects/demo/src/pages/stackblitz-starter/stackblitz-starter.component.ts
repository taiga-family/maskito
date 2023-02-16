import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {tuiRawLoad} from '@taiga-ui/addon-doc';

import {StackblitzService} from './stackblitz.service';

@Component({
    selector: 'stackblitz-starter',
    template: `
        <tui-loader
            size="xxl"
            textContent="Stackblitz loading..."
            class="loader"
            [overlay]="true"
        ></tui-loader>
    `,
    styleUrls: ['./stackblitz-starter.style.less'],
    providers: [StackblitzService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackblitzStarterComponent implements OnInit {
    constructor(private readonly stackblitz: StackblitzService) {}

    async ngOnInit(): Promise<void> {
        await this.openStackblitz();
    }

    async openStackblitz(): Promise<void> {
        const [html, ts, css] = await Promise.all(
            [
                import('./files/index.html?raw'),
                import('./files/index.ts?raw'),
                import('./files/styles.css?raw'),
            ].map(tuiRawLoad),
        );

        return this.stackblitz.openStarter(
            {
                title: 'Maskito Starter',
                description:
                    'A starter with Maskito library\nDocumentation: https://tinkoff.github.io/maskito',
                files: {
                    'index.html': html,
                    'index.ts': ts,
                    'styles.css': css,
                },
            },
            {
                newWindow: false,
                openFile: 'index.ts',
                hideExplorer: true,
            },
        );
    }
}
