import { FC, useState } from 'react';
import styles from './UpdateNews.module.css';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import SelectCategorys from '../../ConteinerMainNews/SelectCategorys/SelectCategorys';
import axios from 'axios';


interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
    categoryId: string; // Обновлено на categoryId
}
interface CurrentNews {
    flag: (f: boolean) => void,
    currentNews: News
}

const OverlayComponent: React.FC = () => {
    return <div className={styles.overlay}></div>;
};

const UpdateNews: FC<CurrentNews> = ({ flag, currentNews }) => {
    const [title, setTitle] = useState(currentNews.title);
    const [desc, setDesc] = useState(currentNews.description);
    const [imgRef, setImgRef] = useState(currentNews.imgSrc);
    const [source, setSource] = useState(currentNews.source);
    const [currentSelectedCategoryId, setCurrentSelectedCategoryId] = useState<string | null>(currentNews.categoryId);
    const [isOverlayActive, setOverlayActive] = useState(true);

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

    //clears the input fields in the form
    const cleareInput = () => {
        setTitle('');
        setDesc('');
        setImgRef('');
        setSource('');
    }

    //Sending the created news to the API
    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submit");

        const token = localStorage.getItem('token');

        if (!title || !desc || !imgRef || !source) {
            console.log("title", title);
            return;
        }
        console.log(currentSelectedCategoryId);
        const newNewsPayLoad = { Title: title, Description: desc, ImgSrc: imgRef, Source: source, CategoryId: currentSelectedCategoryId }

        try {
            console.log(newNewsPayLoad);
            const response = await axios.put(`https://localhost:7142/PresentationNews/${currentNews.id}`, newNewsPayLoad, {
                headers: {
                    'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                }
            }).then((resp) => {
                console.log(resp);
            }).catch((e) => {
                console.log(e);
            });

            console.log("response", response);
        }
        catch (err) {
            alert(err);
            return;
        }
        finally {
            cleareInput();
            handleOnClickButtonClose();
        }
        alert("News update.");
        location.reload();
    }

    const handleOnClickButtonClose = () => {
        setOverlayActive(false);
        flag(false);
    }

    return (
        <>
            {isOverlayActive && <OverlayComponent />}
            <div className={styles.UpdateNews} >
                <Button variant="danger" type="button" onClick={() => handleOnClickButtonClose()} className="position-absolute top-0 end-0 m-2" >X</Button>
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
                    <SelectCategorys onCategoryChange={setCurrentSelectedCategoryId} />
                    <Button variant="primary" type="submit" className="mt-3">Update</Button>
                </Form>
            </div>
        </>

    );
}

export default UpdateNews;
