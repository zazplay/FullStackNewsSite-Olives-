import { FC } from 'react';
import styles from './FooterMainCardHeader.module.css';
import Logo from '../../../../Components/Logo/Logo';
import { dateString, timeSince } from '../../../../State/FormateDate';

interface FooterCardNewsHeaderProps {
    date?: Date 
}

//футер главной карточки в шапке главной страницы
const FooterMainCardHeader: FC<FooterCardNewsHeaderProps> = ({ date=new Date() }) => {
    return (
        <div className={styles.FooterMainCardHeader}>
            <div className={styles.LogoAndTime} >
                <Logo />
                <div>{timeSince(date)}</div>
            </div>
            <div>{dateString(date)}</div>
        </div>
    );
} 

export default FooterMainCardHeader;
