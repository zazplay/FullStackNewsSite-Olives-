import Footer from '../Footer/Footer';
import HeaderSite from '../HeaderSite/HeaderSite';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../../Pages/AdminPage/AdminPage';
import './App.css';
import RegistrForm from '../../Pages/RegistrForm/RegistrForm';
import LoginForm from '../../Pages/LoginForm/LoginForm';
import AddNewsForm from '../../Pages/AddNewsForm/AddNewsForm';
import PageCurentNews from '../../Pages/PageCurentNews/PageCurentNews';
import ConteinerMainNews from '../../Pages/ConteinerMainNews/ConteinerMainNews';
import CRUD_CategoryPage from '../../Pages/CRUD_CategoryPage/CRUD_CategoryPage';
import { useEffect, useRef } from 'react';
function App() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearToken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");

        alert("Ваша сесія завершена через 20 хвилин бездіяльності.");
        console.log("Delete token.");
        // Можна додати перенаправлення, наприклад:
        window.location.href = "/home";
    };

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(clearToken, 20 * 60 * 1000); // 20 хвилин
        //timeoutRef.current = setTimeout(clearToken, 60 * 500); // 30 sec
    };

    const handleActivity = () => {
        resetTimeout();
    };

    useEffect(() => {
        // Додаємо обробники подій для відстеження активності користувача
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        // Встановлюємо початковий таймер
        resetTimeout();

        // Очищаємо обробники подій при розмонтуванні компонента
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, []);


    return (
        <div>
            <Router >
                <HeaderSite />
                <hr className="hr-head" />
                <Routes>
                    <Route path="/" element={<ConteinerMainNews />} />
                    <Route path="/home" element={<ConteinerMainNews />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/registation" element={<RegistrForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/add_news" element={<AddNewsForm />} />
                    <Route path="/news" element={<PageCurentNews />} />
                    <Route path="/category" element={<CRUD_CategoryPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

