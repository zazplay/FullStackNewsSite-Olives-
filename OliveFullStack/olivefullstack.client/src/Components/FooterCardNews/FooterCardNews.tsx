import{ FC } from 'react';
import styles from './FooterCardNews.module.css';
import Logo from '../Logo/Logo';
import { differenceInMinutes, format } from 'date-fns';//для форматирования дати
import { differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

interface FooterCardNewsProps {
    date:Date
}

const FooterCardNews: FC<FooterCardNewsProps> = ({ date }) => {
    function dateString(date: Date) {
        const currentDate: Date = date;
        const formattedDate: string = format(currentDate, 'dd/MM/yyyy');
        return formattedDate;
    }

    //расчитвает время которое прошло с момента добавления новости 
    const timeSince = (pastDate: Date): string => {
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
            return `${monthsDiff} month(s) ago`;
        } else {
            return `${yearsDiff} year(s) ago`;
        }
    };


    return (
        <div className={styles.FooterCardNews}>
            <div className={styles.LogoAndTime} >
                <Logo />
                <div >{timeSince(date)}</div>
            </div>
            <div >{dateString(date)}</div>
        </div>
    );

}





export default FooterCardNews;
