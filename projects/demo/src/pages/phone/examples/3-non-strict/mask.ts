import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export default maskitoPhoneOptionsGenerator({
    countryIsoCode: 'HU',
    metadata,
    strict: false,
});
