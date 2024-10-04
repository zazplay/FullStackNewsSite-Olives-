import { FC, useEffect, useState} from 'react';
import styles from './SectionNews.module.css';
import Card from 'react-bootstrap/esm/Card';
import FooterMainCardHeader from '../../ConteinerMainNews/Header/FooterMainCardHeader/FooterMainCardHeader';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
}

const SectionNews: FC = () => {
    const location = useLocation();
    const { Id } = location.state || {}; // Отримуємо дані з state
    const [currentNews, setCurrentNews] = useState<News | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {

        const getNewsById = async () => {
            try {
                // Асинхронный запрос с использованием await
                const response = await axios.get(`https://localhost:7142/PresentationNews/${Id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                    }
                })

                // Логируем ответ
                console.log("response.data", response.data);
                setCurrentNews(response.data);
                
            } catch (e) {
                console.log(e);
            }
        }

        getNewsById();
    },[Id,token])


        
    return (
        <Card className={styles.mainCard} >
            <Card.Img className={styles.Img} variant="top" src={currentNews?.imgSrc} />
            <Card.Body className={styles.cardBody} >
                <Card.Title className={styles.cardTitle}>{currentNews?.title} </Card.Title>
                <Card.Text>
                    {currentNews?.description}
                    <FooterMainCardHeader date={currentNews?.createdAt}/>
                </Card.Text>
            </Card.Body>
        </Card>
    );

} 
export default SectionNews;

