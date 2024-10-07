import { FC } from 'react';
import styles from './PageCurentNews.module.css';
import SectionNews from './SectionNews/SectionNews';
import "../../Components/App/App.css"
import { useLocation } from 'react-router-dom';
import { ListCardNews } from '../../Components/ListCardNews/ListCardNews';


const PageCurentNews: FC = () => {
    const location = useLocation();
    const { listObj } = location.state || {}; // ќтримуЇмо дан≥ з state

    return (
        <div className="width-main-container">
            <div className={styles.PageCurentNews}>
                <SectionNews />
                <ListCardNews n={6} arrayNews={listObj} />
            </div>
        </div>
        
    );
}

export default PageCurentNews;
