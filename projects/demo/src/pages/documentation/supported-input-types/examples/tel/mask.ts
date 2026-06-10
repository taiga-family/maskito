import {maskitoPhone} from '@maskito/phone';
import metadata from 'libphonenumber-js/metadata.min.json';

export default maskitoPhone({
    metadata,
    countryIsoCode: 'US',
});
