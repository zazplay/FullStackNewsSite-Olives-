import { FC } from 'react';
import styles from "./Footer.module.css"
import Reference from './Reference/Reference';

const Footer: FC = () => (
    <div className={styles.Footer}>
        <Reference />
        <div style={{ color: "white" }} >&#169;TopNewProger</div>
        <div style={{ color: "white",  }} >
           Все права у енота
        </div>
  </div>
);

export default Footer;
