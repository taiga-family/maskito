import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/metadata.min.json';

export default maskitoPhoneOptionsGenerator({
    metadata,
    countryIsoCode: 'US',
});
