import { FC } from 'react';
import styles from './Reference.module.css';
import Nav from 'react-bootstrap/esm/Nav';


const Reference: FC = () => (
  <div className={styles.Reference}>
        <div>
            <Nav.Link href="#" className={styles.logo}>Top<span style={{ color: "olivedrab" }} >News</span></Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter} >About us</Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter} >Contact</Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter} >News blog</Nav.Link>
        </div>
        <div className={styles.LinkFooterSecondColm} >
            <Nav.Link href="#" >Temp of sale</Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter} >Privacy policy</Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter}  >Term of use</Nav.Link>
            <Nav.Link href="#" className={styles.LinkFooter} >Current policy</Nav.Link>
        </div>
  </div>
);

export default Reference;
