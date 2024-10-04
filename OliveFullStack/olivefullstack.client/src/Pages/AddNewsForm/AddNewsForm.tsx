import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from "../LoginForm/LoginForm.module.css"
import axios from 'axios';

const AddNewsForm: FC = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState('');
    const [imgRef, setImgRef] = useState('');
    const [source, setSource] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('');

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

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (!title || !desc || !imgRef || !source) {
            console.log("title", title);
            return;
        }

        const newNewsPayLoad = { Title: title, Description: desc, ImgSrc: imgRef, Source: source }

        try {

            const response = axios.post("https://localhost:7142/PresentationNews", newNewsPayLoad, {
                headers: {
                    'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                }
            }).then((resp) => {
                console.log(resp);
            }).catch((e) => console.log(e));

            console.log("response", response);
            // Перезагружаем компонент
            //setTimeout(onAddNote, 1000);
            //console.log("setTimeout(onAddNote, 1000);");

        }
        catch (err) {
            console.log(err);
        }




    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(selectedOption);
        setTimeout(() => setSelectedOption(event.target.value),500);
        console.log(selectedOption);
    };

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
                    <option>Select a category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Button variant="primary" type="submit">Add </Button>
            </Form>
        </div>
    );
} 

export default AddNewsForm;
