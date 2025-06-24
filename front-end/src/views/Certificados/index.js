import styles from "./Certificados.module.css";
import Header from "../../components/Header";
import DataGrid from "../../components/DataGrid";

export default function Certificados() {
    return (
    <div className={styles.container}>
        <Header/>
      <div className={styles.content}>
        <DataGrid rows={null} columns={null}/>
      </div>
    </div>
    );
}
