import { FC, useEffect, useState } from 'react';
import styles from './ConteinerMainNews.module.css';
import Header from './Header/Header';
import '../../Components/App/App.css'
import axios from 'axios';
import { ListCardNews } from '../../Components/ListCardNews/ListCardNews';
interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
}

const ConteinerMainNews: FC = () => {
    const [listNews, setListNews] = useState<News[]>([]);

    useEffect(() => {

        const handleLoad = async () => {
            const token = localStorage.getItem('token');
            console.log("handleLoad");

            try {
                // Асинхронный запрос с использованием await
                const response = await axios.get("https://localhost:7142/PresentationNews", {
                    headers: {
                        'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                    }
                });

                // Логируем ответ
                console.log("response", response.data);

                // Записываем данные в массив
                if (response && response.data) {
                    setListNews(response.data);
                } // Предполагается, что response.data содержит массив заметок


            } catch (e) {
                console.log(e);
            }
        }

        handleLoad();
    }, [])

    useEffect(() => {
        // Логируем обновленное состояние listNews
        console.log("Updated listNews", listNews);
    }, [listNews]);

    return (
        <div className="width-main-container">
            <Header array={listNews} />
            <hr className={styles.hr} />
            <div className="style-for-title-container">News</div>
            <div className={styles.BodyNews} >
                <ListCardNews start={3} n={9} arrayNews={listNews} />
                <ListCardNews start={9} n={15} arrayNews={listNews} />
            </div>
        </div>
    );
}

export default ConteinerMainNews;
