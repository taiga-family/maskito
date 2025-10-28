const {resolve} = require('node:path');

/**
 * Otherwise, demo application logs warning:
 * ```
 * Component provided template option but runtime compilation is not supported in this build of Vue.
 * Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js"`.
 * ```
 * Equivalent to webpack's alias: { vue$: 'vue/dist/vue.esm-bundler.js' }
 */
module.exports = {
    name: 'vue-esm',
    setup(build) {
        build.onResolve({filter: /^vue$/}, () => ({
            path: resolve(
                build.initialOptions.absWorkingDir,
                './node_modules/vue/dist/vue.esm-bundler.js',
            ),
        }));
    },
};
