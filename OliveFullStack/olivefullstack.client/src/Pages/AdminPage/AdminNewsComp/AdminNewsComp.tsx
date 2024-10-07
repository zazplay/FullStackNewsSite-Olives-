import { FC } from 'react';
import styles from './AdminNewsComp.module.css';
import Button from 'react-bootstrap/esm/Button';

interface AdminNewsCompProps {
    guidID: string;
    imageUrl: string;
    title: string;
    description: string;
    date: string;
    editIconUrl: string;
    onEditClick: () => void;
    addNewsToListOnDelete: (ids: string[]) => void,//����� ������� ������ ���� ��� ��������
    listNewsOnDelete: string[] | null //���� ���� ����� �������� id ������� �� ��������
}

const AdminNewsComp: FC<AdminNewsCompProps> = ({
    guidID,
    imageUrl,
    title,
    description,
    date,
    editIconUrl,
    onEditClick,
    addNewsToListOnDelete,
    listNewsOnDelete
}) => {


    // ������� ��� ��������� ��������� � checkbox
    const handleCheckboxChange = (id: string) => {
        let newList = [];
        if (listNewsOnDelete?.includes(id)) {
            // �������, ���� ��� ������
            newList = listNewsOnDelete.filter((item) => item !== id);
        } else {
            // ���������, ���� �� ������
            newList = [...listNewsOnDelete!, id];
        }

        addNewsToListOnDelete(newList);
    };

    return (
        <div className={styles.AdminNewsComp}>
            <input className={styles.AdminNewsCheckbox}
                type="checkbox"
                checked={listNewsOnDelete?.includes(guidID)}
                onChange={() => handleCheckboxChange(guidID)} // ����������� ���������
            >
            </input>
            <div className={styles.adminNewsItem}>
                <img className={styles.adminNewsImage} src={imageUrl} alt="News" />
                <div className={styles.adminTittleDescCont}>
                    <div className={styles.tittleAdminNews}>{title}</div>
                    <div className={styles.descAdminNews}>{description}</div>
                </div>
                <div className={styles.dateAdminNews}>{date}</div>
                <Button variant="warning" type="button" onClick={onEditClick} className="w-75 h-50 mt-4" >
                    <div className={styles.ButtonEditStyle} >
                        <img
                            className={styles.editImg}
                            src={editIconUrl}
                            alt="Edit"
                            onClick={onEditClick}
                        />
                        <div className={styles.editText} >Edit</div>
                    </div>
                </Button>
            </div>
        </div>
    );
}



export default AdminNewsComp;
