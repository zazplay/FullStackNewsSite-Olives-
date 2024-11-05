import { FC, useState, useEffect } from 'react';
import styles from './SelectCategorys.module.css';
import Form from 'react-bootstrap/esm/Form';
import { getAllCategory } from '../../../State/Request';

interface Category {
    id: string,
    name: string
}
interface SelectCategorysProps {
    categoryId?: string,
    onCategoryChange: (categoryId: string) => void;
}

const SelectCategorys: FC<SelectCategorysProps> = ({ onCategoryChange, categoryId = "" }) => {

    const [listCategories, setListCategories] = useState<Category[]>([]);//список категорий

    // Getting categories
    useEffect(() => {
        const handleLoad = async () => {
            const resulrRequest = await getAllCategory();
            setListCategories(resulrRequest);
        }

        handleLoad();
    }, [])

    //устанавливае вибраную категорию
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        onCategoryChange(selectedId === "All news" ? "" : selectedId);
    };

    return (
        <div className={styles.SelectCategorys}>
            <Form.Select
                aria-label="Default select example"
                size="sm"
                onChange={handleCategoryChange}
                value={categoryId || "All news"}
            >
                {categoryId==="" && <option>All news</option>}
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
