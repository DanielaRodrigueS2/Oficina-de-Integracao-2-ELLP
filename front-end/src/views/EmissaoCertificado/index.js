import { useParams, useNavigate } from "react-router-dom";
import styles from "./EmissaoCertificado.module.css";
import Header from "../../components/Header";
import { useState } from "react";
import api from "../../services/api";

export default function EmissaoCertificado() {
    const { idVoluntario } = useParams();
    const navigate = useNavigate();

    const [oficina, setOficina] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [semestre, setSemestre] = useState("");
    const [dataEmissao, setDataEmissao] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                `/voluntarios/${idVoluntario}/certificados`,
                {
                    oficina,
                    cargaHoraria,
                    inicio,
                    fim,
                    semestre,
                    dataEmissao,
                },
                {
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificado-${idVoluntario}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            alert("Certificado gerado e baixado com sucesso!");
            navigate("/ListaVoluntarios");
        } catch (error) {
            console.error(error);
            alert("Erro ao emitir certificado.");
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Emissão de certificado</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="oficina">Oficina</label>
                            <input
                                type="text"
                                id="oficina"
                                value={oficina}
                                onChange={(e) => setOficina(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="cargaHoraria">Carga Horária</label>
                            <input
                                type="text"
                                id="cargaHoraria"
                                value={cargaHoraria}
                                onChange={(e) => setCargaHoraria(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="semestre">Semestre</label>
                            <input
                                type="text"
                                id="semestre"
                                value={semestre}
                                onChange={(e) => setSemestre(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="dataEmissao">Data de Emissão</label>
                            <input
                                type="date"
                                id="dataEmissao"
                                value={dataEmissao}
                                onChange={(e) => setDataEmissao(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.datesGroup}>
                        <p>Período da atividade realizada</p>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="inicio">Início</label>
                                <input
                                    type="date"
                                    id="inicio"
                                    value={inicio}
                                    onChange={(e) => setInicio(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="fim">Fim</label>
                                <input
                                    type="date"
                                    id="fim"
                                    value={fim}
                                    onChange={(e) => setFim(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btnAzul}>
                            Emitir Certificado
                        </button>
                        <button
                            type="button"
                            className={styles.btnCancelar}
                            onClick={() => navigate("/ListaVoluntarios")}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
