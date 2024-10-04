import { FC } from 'react';
import styles from './Logo.module.css';
import logo from "../../Img/Pngtreenews label_8695965.png"
//interface LogoProps {}

const Logo: FC = () => (
    <div className={ styles.Container} >
        <img className={styles.LogoStyle} src={logo} />
        <div>TopNews</div>
    </div>
);

export default Logo;
