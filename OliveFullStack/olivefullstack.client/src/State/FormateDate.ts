//для форматирования дати
import { differenceInHours, differenceInDays, differenceInMonths, differenceInYears, differenceInMinutes, format } from 'date-fns';

//date and time formating
//обрабативает время в нужный формат
export function dateString(date: Date) {
    const currentDate: Date = date;
    const formattedDate: string = format(currentDate, 'dd/MM/yyyy');
    return formattedDate;
}

//расчитвает время которое прошло с момента добавления новости 
export const timeSince = (pastDate: Date): string => {
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, pastDate);
    const hoursDiff = differenceInHours(now, pastDate);
    const daysDiff = differenceInDays(now, pastDate);
    const monthsDiff = differenceInMonths(now, pastDate);
    const yearsDiff = differenceInYears(now, pastDate);

    if (minutesDiff < 60) {
        return `Added at ${format(pastDate, 'HH:mm')}`;
    } else if (hoursDiff < 24) {
        return `${hoursDiff} hour(s) ago`;
    } else if (daysDiff < 30) {
        return `${daysDiff} day(s) ago`;
    } else if (monthsDiff < 12) {
        return `${(monthsDiff + 1)} month(s) ago`;
    } else {
        return `${yearsDiff} year(s) ago`;
    }
};