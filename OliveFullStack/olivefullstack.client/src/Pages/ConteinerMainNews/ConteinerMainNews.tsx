import { FC, useContext, useEffect, useState } from 'react';
import styles from './ConteinerMainNews.module.css';
import Header from './Header/Header';
import '../../Components/App/App.css';
import { ListCardNews } from '../../Components/ListCardNews/ListCardNews';
import SelectCategorys from './SelectCategorys/SelectCategorys';
import { getAllNews, NewsContext } from "../../State/NewsContext";


const ConteinerMainNews: FC = () => {
    const { objNews, setListNews } = useContext(NewsContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        const handleLoad = async () => {
            await getAllNews().then(newsArray => {
                console.log("newsArray", newsArray); // Використовуємо отриманий масив
                setListNews(newsArray);
            });
        }

        handleLoad();

    }, [setListNews]);

    const filteredNews = (selectedCategoryId
        ? objNews.filter(news => news.categoryId === selectedCategoryId)
        : objNews).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
       
    return (
        <div className="width-main-container">
            <div className={styles.ContainerCategorySelector}>
                <SelectCategorys onCategoryChange={setSelectedCategoryId} />
            </div>
            <Header listNews={filteredNews} />
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
