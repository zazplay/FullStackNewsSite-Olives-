import { FC, useContext, useEffect, useState } from 'react';
import styles from './AdminPage.module.css';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import "../../Components/App/App.css"
import ListNewsForAdmin from './ListNewsForAdmin/ListNewsForAdmin';
import { NewsContext } from "../../State/NewsContext";
import { deleteListNest, getAllNews } from '../../State/Request';

const AdminPage: FC = () => {
    const [listNewsIdOnDelete, setListNewsIdOnDelete] = useState<string[]>([]);//список категорій
    const { objNews, setListNews } = useContext(NewsContext);//деструктуризация списка новостей и сетера для него
    const [myFlag] = useState((localStorage.getItem('token')));//флаг для отображения страници если токена нету страница не отображается

    //отримання всіх новин
    useEffect(() => {
        //загрузка списка новостей
        const handleLoad = async () => {
            await getAllNews().then(newsArray => {
                setListNews(newsArray);// Використовуємо отриманий масив
            });
        }

        handleLoad();
    }, [setListNews])

    useEffect(() => {
        // Логируем обновленное состояние objNews
        //console.log("Updated objNews", objNews);
    }, [objNews]);

    //функция видалення новин
    const handleClick = async () => {
        deleteListNest(listNewsIdOnDelete).then(respons => {
            if (respons) {
                // перезагрузка списка новостей
                window.location.reload();
            }
        });
        
    }

    const listNewsSorted = objNews?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return (myFlag &&
        <div className="width-main-container">
            <div className={styles.AdminTitle + ' ' + styles.blockInteractions} >Admin <span style={{ color: "skyblue" }} >panel</span> </div>
            <div className={styles.ConteinerCRUDOperation} >
                <div><InputGroup className="mb-3 w-75">
                    <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="primary" id="button-addon2">
                        Enter
                    </Button>
                </InputGroup>
                </div>
                <a href={"category"} className={styles.Publish} >Categroy</a>
                <a href={"add_news"} className={styles.Publish} >+ Publish</a>
                <button className={styles.BtnDeleteStyle} onClick={handleClick} >Delete</button>
                <div className={styles.Publish}>Sorting</div>
                <div className={styles.Publish}>Filter</div>
            </div>
            <ListNewsForAdmin listObj={listNewsSorted} listOnDelete={listNewsIdOnDelete} setListOnDelete={setListNewsIdOnDelete} />
        </div>
    );
}

export default AdminPage;
