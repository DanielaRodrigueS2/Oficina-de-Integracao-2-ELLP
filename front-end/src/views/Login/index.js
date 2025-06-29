import { useState } from "react";
import styles from "./Login.module.css";
import PopUpLogin from "../../components/PopUpLogin";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div>
            <img src="/images/Logotipo (Transparente) (1).png" alt="Logo ELLP" className={styles.logoImg}/>
        </div>
        <div className={styles.buttongroup}>
          <button className={styles.btn} onClick={() => setShowLogin(true)}>Entrar</button>
          <button className={styles.btn}>Certificados</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentinner}>
          <img src="/images/Isotipo (Transparente).png" alt="Robô ELLP" className={styles.robotimage}/>
          <div className={styles.textblock}>
            <p>Sistema de Certificado</p>
            <p>dos Voluntários do</p>
            <p>projeto ELLP</p>
          </div>
        </div>
      </div>

      {showLogin && (
        <div onClick={() => setShowLogin(false)}>
          <PopUpLogin/>
        </div>
      )}
    </div>
  );
}