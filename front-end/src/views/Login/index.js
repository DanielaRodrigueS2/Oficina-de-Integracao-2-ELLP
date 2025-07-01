import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import PopUpLogin from "../../components/PopUpLogin";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <Link to='/'>
          <img src="/images/Logotipo (Transparente) (1).png" alt="Logo ELLP" className={styles.logoImg} />
        </Link>
        <div className={styles.buttongroup}>
          <button className={styles.btn} onClick={() => setShowLogin(true)}>Entrar</button>
          <Link to='/certificadosLogOut'>
            <button className={styles.btn}>Certificados</button>
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentinner}>
          <img src="/images/Isotipo (Transparente).png" alt="Robô ELLP" className={styles.robotimage} />
          <div className={styles.textblock}>
            <p>Sistema de Certificado</p>
            <p>dos Voluntários do</p>
            <p>Projeto ELLP</p>
          </div>
        </div>
      </div>

      {showLogin && (
        <div onClick={() => setShowLogin(false)}>
          <PopUpLogin />
        </div>
      )}
    </div>
  );
}