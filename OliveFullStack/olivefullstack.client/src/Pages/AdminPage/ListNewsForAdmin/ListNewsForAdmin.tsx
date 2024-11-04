import { FC, useState } from 'react';
import styles from './ListNewsForAdmin.module.css';
import AdminNewsComp from '../AdminNewsComp/AdminNewsComp';
import UpdateNews from '../UpdateNews/UpdateNews';
import { News } from "../../../State/NewsContext";
import { dateString } from '../../../State/FormateDate';

interface ObjNews {
    listObj: News[],//���� ��������
    setListOnDelete: (ids: string[]) => void,//����� ������� ������ ���� ��� ��������
    listOnDelete: string[] //���� ���� ����� �������� id ������� �� ��������
}

const ListNewsForAdmin: FC<ObjNews> = ({ listObj, setListOnDelete, listOnDelete }) => {
    const [newsEditSelected, setNewsEditSelected] = useState<News>();
    const [show, setShow] = useState<boolean>(false);

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
                        onEditClick={() => popUpWindowEditingNews(news)} // спливаюче вікно Новини редагування
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
