import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export default maskitoPhoneOptionsGenerator({
    countryIsoCode: 'US',
    metadata,
    format: 'NATIONAL',
});
