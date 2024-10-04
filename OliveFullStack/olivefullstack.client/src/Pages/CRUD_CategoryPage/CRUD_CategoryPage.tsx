import { FC } from 'react';
import styles from './CRUD_CategoryPage.module.css';
import Form from 'react-bootstrap/esm/Form';
import '../../Components/App/App.css'
import { Button } from 'react-bootstrap';


//interface CRUD_CategoryPageProps {}

const CRUD_CategoryPage: FC = () => (
    <div className="width-main-container">
        <div className={styles.CRUD_CategoryPage}>
            <div className={styles.Functionality} >
                <Form.Select aria-label="Default select example" size="sm" >
                    <option>Select a category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Button variant="success" className="mx-1">Add</Button>
                <Button variant="warning" className="mx-1">Update</Button>
                <Button variant="danger" className="mx-1">Delete</Button>
            </div>
        </div>
    </div>
  
);

export default CRUD_CategoryPage;
