import { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "./MainCardHeaderStyles.module.css";
import FooterMainCardHeader from "../FooterMainCardHeader/FooterMainCardHeader";
import { useNavigate } from 'react-router-dom';

interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
}

interface TopNews {
    topNews: News,
    listObj: News[]
}


const MainCardHeader: FC<TopNews> = ({ topNews, listObj }) => {

    const navigate = useNavigate();

    const handleClick = () => {

        const data = { Id: topNews.id, listObj}
        navigate("/news", {state:data});

    }

    return (
        <Card className={styles.mainCard} onClick={handleClick} >
            <Card.Img className={ styles.Img} variant="top" src={topNews?.imgSrc} />
            <Card.Body className={styles.cardBody} >
                <Card.Title className={styles.cardTitle} >{topNews?.title}</Card.Title>
                <Card.Text>
                    <div className={styles.mainCardDesc}>
                         {topNews?.description}
                         
                    </div>
                    
                    <FooterMainCardHeader date={topNews?.createdAt} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default MainCardHeader;

