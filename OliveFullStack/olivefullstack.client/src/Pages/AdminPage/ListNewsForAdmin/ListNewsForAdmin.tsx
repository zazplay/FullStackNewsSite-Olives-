import { FC, useState } from 'react';
import styles from './ListNewsForAdmin.module.css';
import AdminNewsComp from '../AdminNewsComp/AdminNewsComp';
import { format } from 'date-fns';//��� �������������� ����
import UpdateNews from '../UpdateNews/UpdateNews';
import { News } from "../../../State/NewsContext";

interface ObjNews {
    listObj: News[],//���� ��������
    setListOnDelete: (ids: string[]) => void,//����� ������� ������ ���� ��� ��������
    listOnDelete: string[] //���� ���� ����� �������� id ������� �� ��������
}
const ListNewsForAdmin: FC<ObjNews> = ({ listObj, setListOnDelete, listOnDelete }) => {
    const [newsEditSelected, setNewsEditSelected] = useState<News>();
    const [show, setShow] = useState<boolean>(false);
    //����������� ����
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
                        onEditClick={() => popUpWindowEditingNews(news)} // ������� �� �����
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
