import {maskitoDateOptionsGenerator} from '@maskito/kit';

export default maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    min: new Date(2000, 0, 1),
    max: new Date(2025, 4, 10),
});
