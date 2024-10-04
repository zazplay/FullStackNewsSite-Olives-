import { FC } from 'react';
import styles from './HeaderListCardNews.module.css';
import { CardNews } from '../../../../Components/CardNews/CardNews';
interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
}
interface HeaderListCardNewsProps {
    start?:number,
    n: number,
    arrayNews: News[]
}

//��������� � 3 ���������� � ����� �� ������� �� ������� ��������
const HeaderListCardNews: FC<HeaderListCardNewsProps> = ({start=0, n, arrayNews }) => {
    const newArr = arrayNews.slice(start, n);//�������� ������ n ���������

    const items: React.ReactNode[] = newArr.map((item) =>
        item &&
        <CardNews key={item.id} obj={item} listObj={arrayNews} />);//���� ������� ���������� ����� ��� � ��������

    return <div className={styles.ListCardNews} >{items}</div>;
};

export default HeaderListCardNews;
