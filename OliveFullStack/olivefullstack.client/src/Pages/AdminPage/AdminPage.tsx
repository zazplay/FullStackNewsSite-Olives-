import { FC, useEffect, useState } from 'react';
import styles from './AdminPage.module.css';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import "../../Components/App/App.css"
import ListNewsForAdmin from './ListNewsForAdmin/ListNewsForAdmin';
import axios from 'axios';

interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
}

const AdminPage: FC = () => {
    const [listNewsIdOnDelete, setListNewsIdOnDelete] = useState<string[]>([]);
    const [listNews, setListNews] = useState<News[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    //отримання всих новин
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
    }, [reload])

    useEffect(() => {
        // Логируем обновленное состояние listNews
        console.log("Updated listNews", listNews);
    }, [listNews]);

    //функция видалення новин

    // (Витя добавил удаление потому что мне стало скучно :D )
    

    const handleClick = async () => {
        if (listNewsIdOnDelete === null || listNewsIdOnDelete.length === 0) return;
        console.log("Delete button");
        console.log('listNewsIdOnDelete', listNewsIdOnDelete);
        
        const token = localStorage.getItem('token');
        console.log("handleLoad");
    
        try {
            const response = await axios.delete("https://localhost:7142/PresentationNews/deleteByIds", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                data: { ids: listNewsIdOnDelete }
            });
            
            console.log("Response:", response);
            setReload(!reload);
            window.location.reload();
             // перезагрузка списка новин
        } catch (e) {
            console.error("Error deleting news:", e);
            if (axios.isAxiosError(e)) {
                console.error("Response data:", e.response?.data);
                console.error("Status:", e.response?.status);
            }
        }
    }

    return (
        <div className="width-main-container">
            <div className={styles.AdminTitle} >Admin <span style={{ color: "skyblue" }} >panel</span> </div>
            <div className={styles.ConteinerCRUDOperation} >
                <div><InputGroup className="mb-3 w-75">
                    <Form.Control
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Button
                    </Button>
                </InputGroup>
                </div>
                <a href={"add_news"} className={styles.Publish} >+ Publish</a>
                <button className={styles.BtnDeleteStyle} onClick={handleClick} >Delete</button>
                <div className={styles.Publish}>Sorting</div>
                <div className={styles.Publish}>Filter</div>

            </div>
            <ListNewsForAdmin listObj={listNews} listOnDelete={listNewsIdOnDelete} setListOnDelete={setListNewsIdOnDelete} />

        </div>
    );
}

export default AdminPage;
