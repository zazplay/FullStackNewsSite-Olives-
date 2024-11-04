import  { FC } from 'react';
import styles from './CardNews.module.css';
import FooterCardNews from '../FooterCardNews/FooterCardNews';
import { useNavigate } from 'react-router-dom';
import { News } from "../../State/NewsContext";


interface ObjNews {
    obj: News,
    listObj: News[]
}
export const CardNews: FC<ObjNews> = ({ obj, listObj }) => {

    const navigate = useNavigate();
    //обработка нажатия на карточку
    const handleClick = () => {

        const data = { Id: obj.id, listObj }
        //переход на страницу где разворачивается даная карточка с новостью
        navigate("/news", {state:data});
    }

    return (
        <div className={styles.CardNews} onClick={handleClick} >
            <img className={styles.imgStyles} src={obj.imgSrc} />
            <div className={styles.ContainerInfo} >
                <div className={styles.cardBody} >{obj.title}</div>
                <FooterCardNews date={obj.createdAt} />
            </div>
        </div>
    );
}



