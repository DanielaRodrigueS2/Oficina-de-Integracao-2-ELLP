import styles from "./ListaVoluntarios.module.css";
import Header from "../../components/Header";
import DataGrid from "../../components/DataGrid";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ListaVoluntarios() {
  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState([]);

  const colunas = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "departamento", headerName: "Departamento", flex: 1 },
    { field: "situacao", headerName: "Situação", flex: 1 },
    {
      field: "acoes",
      headerName: "Ações",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginRight: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.id);
            }}
          >
            Excluir
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/voluntario/${params.id}/certificados`);
            }}
          >
            Emitir Certificado
          </Button>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este voluntário?")) {
      try {
        await api.delete(`/voluntarios/${id}`);
        setVoluntarios((prev) => prev.filter((v) => v.id !== id));
        alert("Voluntário excluído com sucesso!");
      } catch (error) {
        alert("Erro ao excluir voluntário");
      }
    }
  };

  const handleRowClick = (params) => {
    navigate(`/voluntario/${params.id}`);
  };

  useEffect(() => {
    async function carregarVoluntarios() {
      try {
        const resposta = await api.get("/voluntarios");
        const linhasFormatadas = resposta.data.map((v) => ({
          id: v.id,
          nome: v.nome,
          email: v.email,
          departamento: v.departamento,
          situacao: v.situacao,
        }));
        setVoluntarios(linhasFormatadas);
      } catch (erro) {
        console.error("Erro ao buscar voluntários:", erro);
      }
    }

    carregarVoluntarios();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <DataGrid rows={voluntarios} columns={colunas} onRowClick={handleRowClick}/>
      </div>
    </div>
  );
}
