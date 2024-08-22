import {countDigits} from '../count-digits';

export function getFirstCompleteDate(
    dateString: string,
    dateModeTemplate: string,
): string {
    const digitsInDate = countDigits(dateModeTemplate);
    const [completeDate = ''] =
        new RegExp(`(\\D*\\d){${digitsInDate}}`).exec(dateString) || [];

    return completeDate;
}
