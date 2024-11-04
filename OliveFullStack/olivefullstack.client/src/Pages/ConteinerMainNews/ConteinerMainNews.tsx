import { FC, useContext, useEffect, useState } from 'react';
import styles from './ConteinerMainNews.module.css';
import Header from './Header/Header';
import '../../Components/App/App.css';
import { ListCardNews } from '../../Components/ListCardNews/ListCardNews';
import SelectCategorys from './SelectCategorys/SelectCategorys';
import { NewsContext } from "../../State/NewsContext";
import { getAllNews } from '../../State/Request';

//начальний индекс в списке новостей для первой части
const START_ACCOUNT_FIRST_PART = 3;
//начальний индекс в списке новостей для второй части он же конец первой части
const START_ACCOUNT_SECOND_PART = 9;
//конечний индекс второй части
const END_ACCOUNT = 15;

const ConteinerMainNews: FC = () => {
    const { objNews, setListNews } = useContext(NewsContext);//деструктуризация списка новостей и сетера для него
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);//список категорій

    //получение списка новостей
    useEffect(() => {
        const handleLoad = async () => {
            await getAllNews().then(newsArray => {
                console.log("newsArray", newsArray); // Використовуємо отриманий масив
                setListNews(newsArray);
            });
        }

        handleLoad();

    }, [setListNews]);

    //фильтрация по категории и по дате добавления
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
                <ListCardNews start={START_ACCOUNT_FIRST_PART} n={START_ACCOUNT_SECOND_PART} arrayNews={filteredNews} />
                <ListCardNews start={START_ACCOUNT_SECOND_PART} n={END_ACCOUNT} arrayNews={filteredNews} />
            </div>
        </div>
    );
}

export default ConteinerMainNews;
