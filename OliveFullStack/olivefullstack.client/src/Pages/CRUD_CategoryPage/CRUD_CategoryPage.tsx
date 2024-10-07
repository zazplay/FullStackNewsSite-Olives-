import { FC, useState } from 'react';
import styles from './CRUD_CategoryPage.module.css';
import '../../Components/App/App.css'
import { Button } from 'react-bootstrap';
import SelectCategorys from '../ConteinerMainNews/SelectCategorys/SelectCategorys';

//interface CRUD_CategoryPageProps {}

const CRUD_CategoryPage: FC = () => {
    const [myFlag] = useState((localStorage.getItem('token')));
    const [currentCategoryId, setCurrentCategoryId] = useState<string|null>(null);

    return (myFlag &&
        <div className="width-main-container">
            <div className={styles.CRUD_CategoryPage}>
                <div className={styles.Functionality} >
                    <SelectCategorys onCategoryChange={setCurrentCategoryId} />
                    <Button variant="success" className="mx-1">Add</Button>
                    <Button variant="warning" className="mx-1">Update</Button>
                    <Button variant="danger" className="mx-1">Delete</Button>
                </div>
            </div>
        </div>
    );

}

export default CRUD_CategoryPage;
