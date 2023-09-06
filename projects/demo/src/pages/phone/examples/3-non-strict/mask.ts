import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export default maskitoPhoneOptionsGenerator({
    countryIsoCode: 'RU',
    metadata,
    strict: false,
});
