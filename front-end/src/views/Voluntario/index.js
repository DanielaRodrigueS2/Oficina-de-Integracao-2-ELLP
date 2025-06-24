import { Link } from "react-router-dom";
import styles from "./Voluntario.module.css";
import Header from "../../components/Header";
import api from "../../services/api";
import { useState } from "react";

export default function Voluntario(){
  
  const [nome, setNome] = useState("");
  const [RA, setRA] = useState("");
  const [telefone, setTelefone] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [situacao, setSituacao] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{


    }
    catch(error){
      
    }

  };


  return (
    <div className={styles.container}>
      <Header/>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Voluntário</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Nome</label>
          <input type="text" value={nome} onChange={e=> setNome(e.target.value)}/>

          <div className={styles.row}>
            <div>
              <label>RA</label>
              <input type="text" value={RA} onChange={e=> setRA(e.target.value)} />
            </div>
            <div>
              <label>Telefone</label>
              <input type="text" value={telefone} onChange={e=> setTelefone(e.target.value)}/>
            </div>
            <div>
              <label>CPF</label>
              <input type="text" value={CPF} onChange={e=> setCPF(e.target.value)}/>
            </div>
          </div>

          <label>Email</label>
          <input type="email" value={email} onChange={e=> setEmail(e.target.value)}/>

          <div className={styles.row}>
            <div className={styles.selectGroup}>
              <label>Curso</label>
              <input type="text" value={curso} onChange={e=> setCurso(e.target.value)} />
            </div>
            <div className={styles.radioGroup}>
              <label>Situação</label>
              <div>
                <input type="radio" id="ativo" name="status" value='Ativo' onChange={e=> setSituacao(e.target.value)} /> <label htmlFor="ativo">Ativo</label>
                <input type="radio" id="inativo" name="status" value="Inativo"/> <label htmlFor="inativo" onChange={e=> setSituacao(e.target.value)}>Inativo</label>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.selectGroup}>
              <label>Departamento</label>
              <input type="text" value={departamento} onChange={e=> setDepartamento(e.target.value)}/>
            </div>
            <div className={styles.selectGroup}>
              <label>Função</label>
              <input type="text" value={funcao} onChange={e=> setFuncao(e.target.value)}/>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Link to="/ListaVoluntarios">
            <button className={styles.btnCadastrar} type="submit">Cadastrar</button>
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
