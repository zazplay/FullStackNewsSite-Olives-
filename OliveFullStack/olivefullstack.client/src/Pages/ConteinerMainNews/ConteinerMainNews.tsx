import { FC, useEffect, useState } from 'react';
import styles from './ConteinerMainNews.module.css';
import Header from './Header/Header';
import '../../Components/App/App.css';
import axios from 'axios';
import { ListCardNews } from '../../Components/ListCardNews/ListCardNews';
import SelectCategorys from './SelectCategorys/SelectCategorys';

interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
    categoryId: string; // Обновлено на categoryId
}

const ConteinerMainNews: FC = () => {
    const [listNews, setListNews] = useState<News[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        const handleLoad = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get("https://localhost:7142/PresentationNews", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("response", response.data);

                if (response && response.data) {
                    setListNews(response.data);
                }

            } catch (e) {
                console.log(e);
            }
        };

        handleLoad();
    }, []);

    const filteredNews = selectedCategoryId
        ? listNews.filter(news => news.categoryId === selectedCategoryId) 
        : listNews;

    return (
        <div className="width-main-container">
            <div className={styles.ContainerCategorySelector}>
    <SelectCategorys onCategoryChange={setSelectedCategoryId} />
</div>

            <Header array={filteredNews} />
            <hr className={styles.hr} />
            <div className="style-for-title-container">News</div>
            <div className={styles.BodyNews}>
                <ListCardNews start={3} n={9} arrayNews={filteredNews} />
                <ListCardNews start={9} n={15} arrayNews={filteredNews} />
            </div>
        </div>
    );
}

export default ConteinerMainNews;
