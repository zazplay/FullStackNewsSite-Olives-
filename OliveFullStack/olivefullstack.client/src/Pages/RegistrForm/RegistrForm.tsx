import axios from 'axios';
import { FC, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useNavigate } from 'react-router-dom';
import "../../Components/App/App.css"
import styles from "../LoginForm/LoginForm.module.css"

const RegistrForm: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [repeatPass, setRepeatPass] = useState<string>('');
    const navigate = useNavigate();

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);

    }
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    }
    const handleChangeRepeatPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(event.target.value);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (pass !== repeatPass) {
            setRepeatPass("");
            alert("Wrong repeat pass.")
            return;
        }

        const loginPayload = { Username: login, Email: email, Password: pass };
        try {
            axios.post("https://localhost:7142/api/Authenticate/register", loginPayload).then((response) => {
                if (response.status != 200) { console.log(response.status) }

            }).catch((e) => console.log("Error", e));


        }
        catch (e) {
            console.log(e);
        }

        setTimeout(() => {
            return navigate('/login');
        }, 1000);

    }

    return (
        <div className="width-main-container">
            <Form className={styles.Form} onSubmit={handleOnSubmit} >
                <Form.Group className="mb-2" controlId="formGroupLogin">
                    <Form.Label className={styles.Label} >Login</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter login..."
                        value={login}
                        onChange={handleChangeLogin}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupEmail">
                    <Form.Label className={styles.Label} >Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email..."
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label className={styles.Label} >Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={handleChangePass}
                    />
                    <Form.Text className="label-text">
                        The password must consist of uppercase and lowercase letters, as well as at least one number and a symbol.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupRepeatPassword">
                    <Form.Label className={styles.Label} >Repeat password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat password"
                        value={repeatPass}
                        onChange={handleChangeRepeatPass}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enter
                </Button>
            </Form>
        </div>

    )
};

export default RegistrForm;
