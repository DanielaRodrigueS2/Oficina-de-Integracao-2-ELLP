import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

const columns = [
];

const rows = [
];

export default function TabelaVoluntarios() {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    row.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <TextField
        label="Pesquisar por nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
