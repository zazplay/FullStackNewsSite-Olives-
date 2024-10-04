import React, { FC, useState, useEffect } from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginForm.module.css";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'; // Add SweetAlert for animated dialogs

interface JwtPayload {
    [key: string]: unknown;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string[];
}

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

        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');

        const loginPayload = { Username: login, Password: pass };

        try {
            const response = await axios.post("https://localhost:7142/api/Authenticate/login", loginPayload);
            const token = response.data.token;
            
            if (!token) {
                throw new Error("Token not received from the server");
            }

            localStorage.setItem("token", token);

            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                console.log("Decoded token:", decodedToken);
                
                const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                
                if (Array.isArray(roles) && roles.includes('Admin')) {
                    localStorage.setItem('isAdmin', 'true');
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged in as Admin!',
                        showConfirmButton: false,
                        timer: 2000,
                        backdrop: true,
                        toast: true,
                        position: 'top-right',
                        timerProgressBar: true
                    });
                } else {
                    localStorage.setItem('isAdmin', 'false');
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged in as User!',
                        showConfirmButton: false,
                        timer: 2000,
                        backdrop: true,
                        toast: true,
                        position: 'top-right',
                        timerProgressBar: true
                    });
                }
            } catch (decodeError) {
                console.error("Error decoding the token:", decodeError);
                return;
            }

            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (e) {
            console.error("Error during authorization:", e);
            setLogin("");
            setPass("");
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid login or password. Please try again.',
                showConfirmButton: true,
                backdrop: true,
            });
        }
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
