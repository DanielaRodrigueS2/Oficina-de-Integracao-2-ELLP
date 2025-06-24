import { Link } from "react-router-dom";
import styles from "./EmissaoCertificado.module.css";
import Header from "../../components/Header";

export default function EmissaoCertificado() {
    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Emissão de certificado - Nome Voluntário</h2>
                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="oficina">Oficina</label>
                            <input type="text" id="oficina" name="oficina" />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="cargaHoraria">Carga Horária</label>
                            <input type="text" id="cargaHoraria" name="cargaHoraria" />
                        </div>
                    </div>

                    <div className={styles.datesGroup}>
                        <p>Período da atividade realizada</p>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="inicio">Início</label>
                                <input type="date" id="inicio" name="inicio" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="fim">Fim</label>
                                <input type="date" id="fim" name="fim" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Link to="/ListaVoluntarios">
                            <button type="submit" className={styles.btnAzul}>
                                Emitir Certificado
                            </button>
                        </Link>
                        <Link to="/ListaVoluntarios">
                            <button type="button" className={styles.btnCancelar}>
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
