import {type RollupOptions} from 'rollup';

export default function rollupConfig(config: RollupOptions): RollupOptions {
    return {
        ...config,
        onwarn(warning, warn) {
            if (
                warning.code === 'CIRCULAR_DEPENDENCY' ||
                warning.message.startsWith('Circular dependency:')
            ) {
                throw new Error(warning.message || 'Circular dependency detected');
            }

            if (config.onwarn) {
                config.onwarn.call(this, warning, warn);

                return;
            }

            warn(warning);
        },
    };
}
