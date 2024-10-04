import { FC } from 'react';
import globe from "../../Img/globe-grid-svgrepo-com.svg";
import item from "./HeaderSite.module.css";
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HeaderSite: FC = () => {
    //const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    //useEffect(() => {
    //    const adminStatus = localStorage.getItem('isAdmin');
    //    setIsAdmin(adminStatus === 'true');
    //}, []);

    const handleAdminClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        const adminStatus = localStorage.getItem('isAdmin');
        console.log(adminStatus);
        if (adminStatus === 'true') {
            navigate('/admin');
        } else {
            alert('You do not have admin privileges.');
        }
    };

    return (
        <>
            <Navbar className={item.HeaderSite}>
                <Navbar.Brand href="#" className="m-0">
                    <img src={globe} className={item.imgGlobe} alt="Globe" />
                </Navbar.Brand>
                <div className={item.navigation}>
                    <div style={{ display: "flex", flexDirection: 'row' }}>
                        <Nav.Link href="#" className={item.link} style={{ marginLeft: "0.6rem" }}>EN&nbsp;</Nav.Link>
                        <Nav.Link href="#" className={item.link}>UK</Nav.Link>
                    </div>
                    <Nav.Link href="home" className={item.logo}>
                        Top<span style={{ color: "olivedrab" }}>News</span><span style={{ color: "orange" }}>Proger</span>
                    </Nav.Link>
                    <Nav.Link href="login" className={item.itemLinkAccount}>
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                </div>
            </Navbar>
            <div 
                className={item.gearIcon} 
                onClick={handleAdminClick}
                title="Admin Access"
            >
                <FontAwesomeIcon icon={faCog} size="2x" />
            </div>
        </>
    );
};

export default HeaderSite;