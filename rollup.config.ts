import {type RollupOptions} from 'rollup';

export default function rollupConfig(config: RollupOptions): RollupOptions {
    return {
        ...config,
        onwarn(warning, warn) {
            if (warning.code === 'CIRCULAR_DEPENDENCY') {
                throw new Error(warning.message);
            }

            warn(warning);
        },
    };
}
