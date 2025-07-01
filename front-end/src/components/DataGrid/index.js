import { useState } from "react";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

export default function DataGrid({ rows, columns, onRowClick }) {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    row.nome?.toLowerCase().includes(search.toLowerCase())
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

      <Box sx={{ height: 500 }}>
        <MuiDataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={onRowClick}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
