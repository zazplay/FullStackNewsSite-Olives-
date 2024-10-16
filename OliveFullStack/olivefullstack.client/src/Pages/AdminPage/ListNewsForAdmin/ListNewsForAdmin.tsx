import { FC, useState } from 'react';
import styles from './ListNewsForAdmin.module.css';
import AdminNewsComp from '../AdminNewsComp/AdminNewsComp';
import { format } from 'date-fns';//для форматирования дати
import UpdateNews from '../UpdateNews/UpdateNews';
interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
    categoryId: string; // Обновлено на categoryId
}

interface ObjNews {
    listObj: News[],//лист новостей
    setListOnDelete: (ids: string[]) => void,//сетер которий задает лист для удаления
    listOnDelete: string[] //лист куда будут записани id новости на удаление
}
const ListNewsForAdmin: FC<ObjNews> = ({ listObj, setListOnDelete, listOnDelete }) => {
    const [newsEditSelected, setNewsEditSelected] = useState<News>();
    const [show, setShow] = useState<boolean>(false);
    //форматирует дату
    function dateString(date: Date) {
        const currentDate: Date = date;
        const formattedDate: string = format(currentDate, 'dd/MM/yyyy');
        return formattedDate;
    }

    const popUpWindowEditingNews = (news: News) => {
        console.log('Click');
        setNewsEditSelected(news);
        setShow(true);
    }

    return (
        <>
            <div className={styles.ListNewsForAdmin}>
                {listObj.map((news, i) => {

                    return (<AdminNewsComp key={i}
                        guidID={news.id}
                        imageUrl={news.imgSrc}
                        title={news.title}
                        description={news.description}
                        date={dateString(news.createdAt)}
                        editIconUrl="https://cdn-icons-png.flaticon.com/512/4277/4277132.png"
                        onEditClick={() => popUpWindowEditingNews(news)} // переход по клику
                        listNewsOnDelete={listOnDelete}
                        addNewsToListOnDelete={setListOnDelete}
                    />)
                })
                }
            </div>
            {show && <UpdateNews flag={setShow} currentNews={newsEditSelected!} />}
        </>

    );
}

export default ListNewsForAdmin;
