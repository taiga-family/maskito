import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export default maskitoPhoneOptionsGenerator({
    metadata,
    strict: false,
    countryIsoCode: 'RU',
});
