import axios from "axios";
import { News } from "./NewsContext";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'; // Add SweetAlert for animated dialogs

// example https://localhost:7142
const HOST = "https://localhost:7142/";

// geting list news
//отримання всіх новин
export async function getAllNews() {
    try {
        const response = await axios.get<News[]>(`${HOST}PresentationNews`);
        // Логируем ответ
        console.log("response", response.data);
        // Записываем данные в массив
        if (response && response.data) {
            // Предполагается, что response.data содержит массив новостей
            return (response.data);
        }

    } catch (e) {
        console.log(e);
    }
    return [];
}

//получение всех категорий
export async function getAllCategory() {
    try {
        const response = await axios.get(`${HOST}PresentationCategory`);

        if (response && response.data) {
            return response.data;
        }

    } catch (e) {
        console.log(e);
    }
    return [];
}

//получение новости по id
export async function getNewsById(Id: string) {
    try {
        // Асинхронный запрос с использованием await
        const response = await axios.get(`${HOST}PresentationNews/${Id}`);

        if (response && response.data) {
            // Логируем ответ
            console.log("getNewsById->response.data", response.data);
            return response.data;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}

interface RegistrPayload  {
    Username: string,
    Email: string,
    Password: string
}
//Регистрацыя
export async function registr(registrPayload: RegistrPayload) {
    try {
        axios.post(`${HOST}api/Authenticate/register`,  registrPayload  ).then((response) => {
            if (response.status != 200) { console.log(response.status) }
        });
    }
    catch (e) {
        alert("Error registration.")
        console.log(e);
    }
}

interface LoginPayload {
    Username: string,
    Password: string
}
interface JwtPayload {
    [key: string]: unknown;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string[];
}

//вход
export async function loginAccount(loginPayload: LoginPayload) {
    try {
        const response = await axios.post(`${HOST}api/Authenticate/login`, loginPayload);
        const token = response.data.token;

        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');

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
            return false;
        }
    } catch (e) {
        console.error("Error during authorization:", e);
        
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid login or password. Please try again.',
            showConfirmButton: true,
            backdrop: true,
        });
        return false;
    }
    return true;
}