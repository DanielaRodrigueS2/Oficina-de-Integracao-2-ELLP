import { useNavigate } from "react-router-dom";
import styles from "./PopUpLogin.module.css";
import { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../services/firebase";

export default function PopUpLogin() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) =>{

    e.preventDefault();

    try{

      const usuario = await signInWithEmailAndPassword(auth, email, senha);
      console.log(usuario);
      console.log('Login realizado com sucesso')
      //const token = await usuario.user.getIdToken();

      navigate('/Home')

    }
    catch(error){
      console.error('Erro ao realizar o login', error);
      alert('E-mail ou senha inválidos');
    }

  }

  return (
    <div className={styles.popupoverlay}>
      <form onSubmit={handleLogin} className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2>Entrar</h2>
        <label htmlFor="email">E-mail</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" required />
        <label htmlFor="senha">Senha</label>
        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" id="senha" required/>
        <button type='submit' className={styles.popupbtn}>Entrar</button>
      </form>
    </div>
  )
}
