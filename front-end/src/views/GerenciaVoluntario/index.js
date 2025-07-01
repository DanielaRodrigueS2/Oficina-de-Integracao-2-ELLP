import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./GerenciaVoluntario.module.css";
import Header from "../../components/Header";
import api from "../../services/api";

export default function GerenciaVoluntario() {
    const { idVoluntario } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [RA, setRA] = useState("");
    const [telefone, setTelefone] = useState("");
    const [CPF, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [curso, setCurso] = useState("");
    const [situacao, setSituacao] = useState("Ativo");
    const [departamento, setDepartamento] = useState("");
    const [funcao, setFuncao] = useState("");

    useEffect(() => {
        async function fetchVoluntario() {
            try {
                const response = await api.get(`/voluntarios/${idVoluntario}`);
                const data = response.data;

                setNome(data.nome || "");
                setRA(data.RA || "");
                setTelefone(data.telefone || "");
                setCPF(data.CPF || "");
                setEmail(data.email || "");
                setCurso(data.curso || "");
                setSituacao(data.situacao || "Ativo");
                setDepartamento(data.departamento || "");
                setFuncao(data.funcao || "");
            } catch (error) {
                console.error("Erro ao carregar voluntário:", error);
                alert("Erro ao carregar dados do voluntário.");
            }
        }

        if (idVoluntario) {
            fetchVoluntario();
        }
    }, [idVoluntario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/voluntarios/${idVoluntario}`, {
                nome,
                RA,
                telefone,
                CPF,
                email,
                curso,
                situacao,
                departamento,
                funcao,
            });

            alert("Voluntário atualizado com sucesso!");
            navigate("/ListaVoluntarios");
        } catch (error) {
            console.error("Erro ao atualizar voluntário:", error);
            alert("Erro ao salvar alterações.");
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Atualizar Voluntário</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />

                    <div className={styles.row}>
                        <div>
                            <label>RA</label>
                            <input type="text" value={RA} onChange={e => setRA(e.target.value)} />
                        </div>
                        <div>
                            <label>Telefone</label>
                            <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
                        </div>
                        <div>
                            <label>CPF</label>
                            <input type="text" value={CPF} onChange={e => setCPF(e.target.value)} />
                        </div>
                    </div>

                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <div className={styles.row}>
                        <div className={styles.selectGroup}>
                            <label>Curso</label>
                            <input type="text" value={curso} onChange={e => setCurso(e.target.value)} />
                        </div>
                        <div className={styles.radioGroup}>
                            <label>Situação</label>
                            <div>
                                <input
                                    type="radio"
                                    id="ativo"
                                    name="status"
                                    value="Ativo"
                                    checked={situacao === "Ativo"}
                                    onChange={e => setSituacao(e.target.value)}
                                />
                                <label htmlFor="ativo">Ativo</label>
                                <input
                                    type="radio"
                                    id="inativo"
                                    name="status"
                                    value="Inativo"
                                    checked={situacao === "Inativo"}
                                    onChange={e => setSituacao(e.target.value)}
                                />
                                <label htmlFor="inativo">Inativo</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.selectGroup}>
                            <label>Departamento</label>
                            <input type="text" value={departamento} onChange={e => setDepartamento(e.target.value)} />
                        </div>
                        <div className={styles.selectGroup}>
                            <label>Função</label>
                            <input type="text" value={funcao} onChange={e => setFuncao(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.btnCadastrar} type="submit">Salvar</button>
                        <button
                            type="button"
                            className={styles.btnCancelar}
                            onClick={() => {
                                const confirmar = window.confirm("Tem certeza que deseja cancelar? Todas as alterações serão perdidas.");
                                if (confirmar) {
                                    navigate("/ListaVoluntarios");
                                }
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
