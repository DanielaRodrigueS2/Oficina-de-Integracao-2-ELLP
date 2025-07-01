import { useEffect, useState } from "react";
import styles from "./Certificados.module.css";
import Header from "../../components/Header";
import DataGrid from "../../components/DataGrid";
import api from "../../services/api";
import { Button } from "@mui/material";

export default function Certificados() {
  const [certificados, setCertificados] = useState([]);

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
      <Header />
      <div className={styles.content}>
        <DataGrid rows={certificados} columns={colunas} />
      </div>
    </div>
  );
}
