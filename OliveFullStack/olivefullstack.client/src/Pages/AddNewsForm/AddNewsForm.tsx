import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from "../LoginForm/LoginForm.module.css"
import axios from 'axios';

interface Category {
    id: string,
    name: string
}

//Added News
const AddNewsForm: FC = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState('');
    const [imgRef, setImgRef] = useState('');
    const [source, setSource] = useState('');
    const [currentSelected, setCurrentSelected] = useState<string>('');//Current category
    const [listCategories, setListCategories] = useState<Category[]>([]);//list of categories with API

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    }
    const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImgRef(event.target.value);
    }
    const handleSource = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSource(event.target.value);
    }

    //Sending the created news to the API
    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (!title || !desc || !imgRef || !source) {
            console.log("title", title);
            return;
        }

        const newNewsPayLoad = { Title: title, Description: desc, ImgSrc: imgRef, Source: source, Category: currentSelected }

        try {
            console.log(newNewsPayLoad);
            const response = axios.post("https://localhost:7142/PresentationNews", newNewsPayLoad, {
                headers: {
                    'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                }
            }).then((resp) => {
                console.log(resp);
            }).catch((e) => console.log(e));

            console.log("response", response);
        }
        catch (err) {
            console.log(err);
        }
    }

    //Receiving the selected category and recording it in the currentSelected
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSelected(event.target.value);
    };

    useEffect(() => {
        console.log("UseEffect", currentSelected);
    }, [currentSelected])

    // Getting categories
    useEffect(() => {
        const handleLoad = async () => {
            console.log("SelectCategorys");
            
            try {
                const response = await axios.get("https://localhost:7142/PresentationCategory");
               
                console.log("response", response.data);

                if (response && response.data) {
                    setListCategories(response.data);
                    setCurrentSelected(response.data[0].id);
                }

            } catch (e) {
                console.log(e);
            }
        }

        handleLoad();
    }, [])

    return (
        <div className="width-main-container">
            <Form className={styles.Form} onSubmit={handleOnSubmit} >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className={styles.Label}>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title..."
                        value={title}
                        onChange={handleTitle}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={styles.Label}>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={desc}
                        onChange={handleDescription}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label className={styles.Label}>Image link</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Reference..."
                        value={imgRef}
                        onChange={handleImg}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label className={styles.Label}>Source</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Reference..."
                        value={source}
                        onChange={handleSource}
                    />
                </Form.Group>
                <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    className="w-50 mb-3"
                    onChange={handleSelectChange}
                >
                    ( {listCategories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))})
                </Form.Select>
                <Button variant="primary" type="submit">Add </Button>
            </Form>
        </div>
    );
} 

export default AddNewsForm;
