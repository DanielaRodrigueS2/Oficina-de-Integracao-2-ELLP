import styles from "./headerLogin.css";
import Link from "react-router-dom";

function Header () {
    return (
        <header className={styles.header}>
            <div>
                <img src='/images/Logotipo (Transparente) (1).png' alt='Logo ELLP'/>   
            </div>

            <nav>
                <Link to='/Certificados'>Certificados</Link>
            </nav>
        </header>
    );
};

export default Header;