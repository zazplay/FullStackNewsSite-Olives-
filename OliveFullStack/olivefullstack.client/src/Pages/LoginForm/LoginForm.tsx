import React, { FC, useState, useEffect } from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import styles from "./LoginForm.module.css";
import { useNavigate } from 'react-router-dom';
import { loginAccount } from "../../State/Request"

const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("LoginForm component mounted");
    }, []);

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        loginAccount({ Username: login, Password: pass }).then(result => {
            console.log("result", result);
            if (!result) {
                setLogin("");
                setPass("");
                return;
            }
            else {
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        });
    }

    return (
        <div className="width-main-container">
            <div className="status-note-style"></div>
            <Form className={styles.Form} onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label className={styles.Label}>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username..."
                        value={login}
                        onChange={handleChangeLogin}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={styles.Label}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={handleChangePass}
                    />
                </Form.Group>
                <div className={styles.ContainerSubmitRegistration}>
                    <Button variant="primary" type="submit" >
                        Enter
                    </Button>
                    <Nav.Link href="registation" className={styles.LinkRegistr}>Registration</Nav.Link>
                </div>
            </Form>
        </div>
    );
}

export default LoginForm;
