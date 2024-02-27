import {Injectable} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import stackblitz, {OpenOptions, Project} from '@stackblitz/sdk';
import {
    TuiCodeEditor,
    tuiRawLoad,
    tuiTryParseMarkdownCodeBlock,
} from '@taiga-ui/addon-doc';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

import {StackblitzEditButtonComponent} from './components/stackblitz-edit-button/stackblitz-edit-button.component';

@Injectable()
export class StackblitzService implements TuiCodeEditor {
    private readonly baseProjectConfigs: Pick<Project, 'dependencies' | 'template'> = {
        template: 'typescript',
        dependencies: {
            '@maskito/core': '*',
            '@maskito/kit': '*',
        },
    };

    public readonly name = 'Stackblitz';
    public readonly content = new PolymorpheusComponent(StackblitzEditButtonComponent);

    public async edit(
        component: string,
        id: string,
        files: Record<string, string>,
    ): Promise<void> {
        const [tsMd, css] = await Promise.all(
            [import('./files/example.ts.md?raw'), import('./files/styles.css?raw')].map(
                tuiRawLoad,
            ),
        );

        return stackblitz.openProject(
            {
                ...this.baseProjectConfigs,
                title: `maskito/${component}/${id}`,
                description: `Maskito example of the component ${component}`,
                files: {
                    'index.html': component.includes('textarea')
                        ? '<textarea></textarea>'
                        : '<input />',
                    'styles.css': css,
                    'index.ts': tuiTryParseMarkdownCodeBlock(tsMd)[0],
                    'mask.ts': files[DocExamplePrimaryTab.MaskitoOptions],
                },
            },
            {openFile: 'index.ts,mask.ts'},
        );
    }

    protected openStarter(
        {title, description, files}: Pick<Project, 'description' | 'files' | 'title'>,
        openOptions?: OpenOptions,
    ): void {
        return stackblitz.openProject(
            {
                ...this.baseProjectConfigs,
                title,
                description,
                files,
            },
            openOptions,
        );
    }
}
