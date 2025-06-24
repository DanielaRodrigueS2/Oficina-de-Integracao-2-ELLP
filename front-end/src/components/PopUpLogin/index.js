import { Link } from "react-router-dom";
import styles from "./PopUpLogin.module.css";

export default function PopUpLogin() {
  return (
    <div className={styles.popupoverlay}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2>Entrar</h2>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" />
        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" />
        <Link to="/Home">
          <button className={styles.popupbtn}>Entrar</button>
        </Link>
      </div>
    </div>
  )
}
