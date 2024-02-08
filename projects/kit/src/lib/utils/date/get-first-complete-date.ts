import {countDigits} from '../count-digits';

export function getFirstCompleteDate(
    dateString: string,
    dateModeTemplate: string,
): string {
    const digitsInDate = countDigits(dateModeTemplate);
    const [completeDate = ''] =
        dateString.match(new RegExp(`(\\D*\\d){${digitsInDate}}`)) || [];

    return completeDate;
}
