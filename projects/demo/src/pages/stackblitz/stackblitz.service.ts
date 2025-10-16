import {Injectable} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import phonePackageJson from '@maskito/phone/package.json';
import type {OpenOptions, Project} from '@stackblitz/sdk';
import stackblitz from '@stackblitz/sdk';
import type {TuiCodeEditor} from '@taiga-ui/addon-doc';
import {tuiRawLoad, tuiTryParseMarkdownCodeBlock} from '@taiga-ui/addon-doc';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {StackblitzEditButtonComponent} from './components/stackblitz-edit-button/stackblitz-edit-button.component';

@Injectable()
export class StackblitzService implements TuiCodeEditor {
    private readonly baseProjectConfigs: Pick<Project, 'dependencies' | 'template'> = {
        template: 'typescript',
        dependencies: {
            '@maskito/core': 'latest',
            '@maskito/kit': 'latest',
            '@maskito/phone': 'latest',
            'libphonenumber-js': phonePackageJson.peerDependencies['libphonenumber-js'],
        },
    };

    public readonly name = 'Stackblitz';
    public readonly content = new PolymorpheusComponent(StackblitzEditButtonComponent);

    public async edit(
        component: string,
        id: string,
        files: Record<string, string>,
    ): Promise<void> {
        const [tsMd = '', css = ''] = await Promise.all(
            [import('./files/example.ts.md'), import('./files/styles.css')]
                // TODO: remove the first `.map` after release https://github.com/taiga-family/taiga-ui/pull/12270
                .map(async (x) => Promise.resolve(x))
                .map(tuiRawLoad),
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
                    'index.ts': tuiTryParseMarkdownCodeBlock(tsMd)[0] ?? '',
                    'mask.ts': files[DocExamplePrimaryTab.MaskitoOptions] ?? '',
                },
            },
            {openFile: 'index.ts,mask.ts'},
        );
    }

    public openStarter(
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
