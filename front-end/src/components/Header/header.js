import styles from "./header.css";
import Link from "react-router-dom";

function Header () {
    return (
        <header className={styles.header}>
            <Link to='/'>
                <img src='/images/Logotipo (Transparente) (1).png' alt='Logo ELLP'/>      
            </Link>

            <nav>
                <Link to='Voluntarios'>Voluntários</Link>
                <Link to='/Certificados'>Certificados</Link>
            </nav>
        </header>
    );
};

export default Header;