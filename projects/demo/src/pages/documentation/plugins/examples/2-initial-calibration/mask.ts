import {maskitoInitialCalibrationPlugin, MaskitoOptions} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
    mask: /^\d{0,3}$/,
    plugins: [maskitoInitialCalibrationPlugin()],
};

export default maskitoOptions;
