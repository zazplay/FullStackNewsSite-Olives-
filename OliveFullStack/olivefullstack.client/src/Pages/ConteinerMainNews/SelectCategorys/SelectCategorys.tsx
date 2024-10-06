import { FC, useState,useEffect } from 'react';
import styles from './SelectCategorys.module.css';
import Form from 'react-bootstrap/esm/Form';
import axios from 'axios';

interface Category{
    id: string,
    name: string
}

interface SelectCategorysProps {
    onCategoryChange: (categoryId: string | null) => void; }

const SelectCategorys: FC<SelectCategorysProps> = ({ onCategoryChange }) => {

    const [listCategories, setListCategories] = useState<Category[]>([]);

    useEffect(() => {
        const handleLoad = async () => {
            console.log("SelectCategorys");

            try {
                const response = await axios.get("https://localhost:7142/PresentationCategory");

                console.log("response", response.data);

                if (response && response.data) {
                    setListCategories(response.data);
                } 

            } catch (e) {
                console.log(e);
            }
        }

        handleLoad();
    }, [])

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        onCategoryChange(selectedId === "All news" ? null : selectedId); 
    };

    return (
        <div className={styles.SelectCategorys}>
            <Form.Select aria-label="Default select example" size="sm" className="w-25" onChange={handleCategoryChange}> 
                <option>All news</option>
                {listCategories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};


export default SelectCategorys;
