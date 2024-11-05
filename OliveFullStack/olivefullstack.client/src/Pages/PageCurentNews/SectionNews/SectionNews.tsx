import { FC, useEffect, useState } from 'react';
import styles from './SectionNews.module.css';
import Card from 'react-bootstrap/esm/Card';
import FooterMainCardHeader from '../../ConteinerMainNews/Header/FooterMainCardHeader/FooterMainCardHeader';
import { useLocation } from 'react-router-dom';
import { News } from "../../../State/NewsContext";
import { getNewsById } from '../../../State/Request';

const SectionNews: FC = () => {
    const location = useLocation();
    const { Id } = location.state || {}; // Отримуємо дані з state
    const [currentNews, setCurrentNews] = useState<News | null>(null);

    //получение новости по id
    useEffect(() => {

        const getNews = async () => {
            getNewsById(Id).then(prom => {
                setCurrentNews(prom);
            });
        }

        getNews();
    }, [Id])

    useEffect(() => { }, [currentNews]);

    return (
        <Card className={styles.mainCard} >
            < Card.Img className={styles.Img} variant="top" src={currentNews?.imgSrc} />
            {currentNews && <Card.Body className={styles.cardBody} >
                <Card.Title className={styles.cardTitle}>{currentNews?.title} </Card.Title>
                <Card.Text>
                    {currentNews?.description}
                    <FooterMainCardHeader date={currentNews?.createdAt} />
                </Card.Text>
            </Card.Body>}
        </Card>
    );

}
export default SectionNews;

