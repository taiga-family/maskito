const {resolve} = require('node:path');
const {existsSync} = require('node:fs');

/**
 * Maskito repo uses Taiga UI to build demo application.
 * Taiga UI uses Maskito packages as a dependency.
 * Maskito <=> Taiga UI circular dependency.
 * ESBuild is capable to use path aliases from tsconfig, to resolve local imports
 * (e.g. source code of @maskito/kit imports @maskito/core utility).
 * However, ESBuild ignores tsconfig paths when resolving packages inside node_modules.
 */
module.exports = {
    name: 'maskito-as-taiga-ui-dep',
    setup(build) {
        build.onResolve({filter: /^@maskito/}, (args) => {
            if (!args.importer.includes('node_modules/@taiga-ui')) {
                // Ignore for local path aliases (ESBuild handles them properly)
                return;
            }

            const library = args.path // e.g., '@maskito/kit'
                .split('/')[1];
            const entryPoint = resolve(
                __dirname,
                '../../../projects',
                library,
                'src/index.ts',
            );

            return existsSync(entryPoint)
                ? {
                      path: entryPoint,
                  }
                : null;
        });
    },
};
