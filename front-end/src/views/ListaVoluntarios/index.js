import styles from "./ListaVoluntarios.module.css";
import Header from "../../components/Header";
import DataGrid from "../../components/DataGrid";

export default function ListaVoluntarios() {
    return (
    <div className={styles.container}>
        <Header/>
      <div className={styles.content}>
        <DataGrid rows={null} columns={null}/>
      </div>
    </div>
    );
}
