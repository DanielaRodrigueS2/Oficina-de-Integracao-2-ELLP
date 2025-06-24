import { Link } from "react-router-dom";
import styles from "./Voluntario.module.css";
import Header from "../../components/Header";

export default function Voluntario(){
  return (
    <div className={styles.container}>
      <Header/>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Voluntário</h2>
        <form className={styles.form}>
          <label>Nome</label>
          <input type="text" />

          <div className={styles.row}>
            <div>
              <label>RA</label>
              <input type="text" />
            </div>
            <div>
              <label>Telefone</label>
              <input type="text" />
            </div>
            <div>
              <label>CPF</label>
              <input type="text" />
            </div>
          </div>

          <label>Email</label>
          <input type="email" />

          <div className={styles.row}>
            <div className={styles.selectGroup}>
              <label>Curso</label>
              <input type="text" />
            </div>
            <div className={styles.radioGroup}>
              <label>Situação</label>
              <div>
                <input type="radio" id="ativo" name="status" /> <label htmlFor="ativo">Ativo</label>
                <input type="radio" id="inativo" name="status" /> <label htmlFor="inativo">Inativo</label>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.selectGroup}>
              <label>Departamento</label>
              <input type="text" />
            </div>
            <div className={styles.selectGroup}>
              <label>Função</label>
              <input type="text" />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Link to="/ListaVoluntarios">
            <button className={styles.btnCadastrar}>Cadastrar</button>
            </Link>
            <Link to="/ListaVoluntarios">
            <button className={styles.btnLista}>Lista de voluntários</button>
            </Link>
            <Link to="/Home">
            <button className={styles.btnCancelar}>Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
