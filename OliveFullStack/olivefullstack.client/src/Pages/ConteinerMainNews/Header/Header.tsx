import { FC } from "react";
import styles from "./HeaderStyles.module.css";
import { Container } from "react-bootstrap";
import HeaderListCardNews from "./ListCardNews/HeaderListCardNews";
import MainCardHeader from "./MainCardHeader/MainCardHeader";
import { ListNews } from "../../../State/NewsContext";

//����� ������� �������� � ���������(��� ��� ���� ������� ������� � 3 ���������)
//��������� ����� �������� � �������� ������ �� �����������
const Header: FC<ListNews> = ({ listNews }) => {

    return (
        <>
            <h1 className={styles.h1} >Today in the <span className={styles.news} >news</span></h1>
            <Container className={styles.container} >
                <MainCardHeader topNews={listNews[0]} listObj={listNews} />
                <Container>
                    <HeaderListCardNews n={3} arrayNews={listNews} />
                </Container>

            </Container>
        </>)
}

export default Header;