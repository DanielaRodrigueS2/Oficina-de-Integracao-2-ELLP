import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Voluntario.module.css";
import Header from "../../components/Header";
import api from "../../services/api";

export default function Voluntario() {
  const navigate = useNavigate();
  const { idVoluntario } = useParams();

  const [nome, setNome] = useState("");
  const [RA, setRA] = useState("");
  const [telefone, setTelefone] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [situacao, setSituacao] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");

  useEffect(() => {
    if (idVoluntario) {
      api.get(`/voluntarios/${idVoluntario}`).then((res) => {
        const v = res.data;
        setNome(v.nome);
        setRA(v.RA);
        setCPF(v.CPF);
        setCurso(v.curso);
        setTelefone(v.telefone);
        setDepartamento(v.departamento);
        setEmail(v.email);
        setFuncao(v.funcao);
        setSituacao(v.situacao);
      });
    }
  }, [idVoluntario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const voluntario = {
      nome,
      RA,
      CPF,
      curso,
      telefone,
      departamento,
      email,
      funcao,
      situacao,
    };

    try {
      if (idVoluntario) {
        await api.put(`/voluntarios/${idVoluntario}`, voluntario);
        alert("Voluntário atualizado com sucesso!");
      } else {
        await api.post("/voluntarios", voluntario);
        alert("Voluntário criado com sucesso!");
      }
      navigate("/listaVoluntarios");
    } catch (error) {
      alert("Erro ao salvar voluntário");
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Cadastrar Voluntário</h2>
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
              <div>
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
            <button className={styles.btnCadastrar} type="submit">Cadastrar</button>
            <Link to="/listaVoluntarios">
              <button className={styles.btnLista}>Lista de voluntários</button>
            </Link>
            <button
              type="button"
              className={styles.btnCancelar}
              onClick={() => {
                const confirmar = window.confirm("Tem certeza que deseja cancelar? Todas as alterações serão perdidas.");
                if (confirmar) {
                  navigate("/home");
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
