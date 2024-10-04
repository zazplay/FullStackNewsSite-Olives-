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

function App() {

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
                    <Route path="category" element={<CRUD_CategoryPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

