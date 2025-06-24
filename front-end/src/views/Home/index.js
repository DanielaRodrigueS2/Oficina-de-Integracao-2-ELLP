import styles from "./Home.module.css";
import Header from "../../components/Header";

export default function Home() {
    return (
    <div className={styles.container}>
        <Header/>
      <div className={styles.content}>
        <img src="/images/Isotipo (Transparente).png" alt="Robô ELLP" className={styles.robotbackground}/>
      </div>
    </div>
    );
}
