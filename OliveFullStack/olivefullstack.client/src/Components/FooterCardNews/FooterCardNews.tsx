import{ FC } from 'react';
import styles from './FooterCardNews.module.css';
import Logo from '../Logo/Logo';
import { dateString, timeSince } from '../../State/FormateDate';

interface FooterCardNewsProps {
    date:Date
}

//футер карточки
const FooterCardNews: FC<FooterCardNewsProps> = ({ date }) => {
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
