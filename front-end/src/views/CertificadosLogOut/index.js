import { useEffect, useState } from "react";
import styles from "./CertificadosLogOut.module.css";
import DataGrid from "../../components/DataGrid";
import api from "../../services/api";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PopUpLogin from "../../components/PopUpLogin";

export default function CertificadosLogOut() {
    const [certificados, setCertificados] = useState([]);
    const [showLogin, setShowLogin] = useState(false);

    const colunas = [
        { field: "nomeVoluntario", headerName: "Nome do Voluntário", flex: 1 },
        { field: "dataEmissao", headerName: "Data de Emissão", width: 150 },
        {
            field: "download",
            headerName: "Download",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                        window.open(
                            `${process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"}/certificados/download/${params.row.idVoluntario}/${params.row.id}`,
                            "_blank"
                        )
                    }
                >
                    Baixar PDF
                </Button>
            ),
        }

    ];

    useEffect(() => {
        async function carregarCertificados() {
            try {
                const resposta = await api.get("/certificados");
                setCertificados(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar certificados:", erro);
            }
        }

        carregarCertificados();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <Link to='/'>
                    <img src="/images/Logotipo (Transparente) (1).png" alt="Logo ELLP" className={styles.logoImg} />
                </Link>
                <div className={styles.buttongroup}>
                    <button className={styles.btn} onClick={() => setShowLogin(true)}>Entrar</button>
                    <Link to='/certificadosLogOut'>
                        <button className={styles.btn}>Certificados</button>
                    </Link>
                </div>
            </div>
            <div className={styles.content}>
                <DataGrid rows={certificados} columns={colunas} filterField={"nomeVoluntario"} />
            </div>

            {showLogin && (
                <div onClick={() => setShowLogin(false)}>
                    <PopUpLogin />
                </div>
            )}
        </div>
    );
}
