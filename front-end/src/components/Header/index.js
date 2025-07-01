import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.topbar}>
            <Link to='/Home'>
                <img src="/images/Logotipo (Transparente) (1).png" alt="Logo ELLP" className={styles.logoImg} />
            </Link>
            <div className={styles.buttongroup}>
                <Link to='/voluntario'>
                <button className={styles.btn}>Voluntários</button>
                </Link>
                <Link to='/certificados'>
                <button className={styles.btn}>Certificados</button>
                </Link>
            </div>
        </div>
    );
}