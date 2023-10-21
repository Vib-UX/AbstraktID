import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    fullName: "Jon Snow",
    fullNames: "Harvey Roxie",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    fullName: "Cersei Lannister",
    fullNames: "Harvey Roxie",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    fullName: "Jaime Lannister",
    fullNames: "Harvey Roxie",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    fullName: "Arya Stark",
    fullNames: "Harvey Roxie",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    fullName: "Daenerys Targaryen",
    fullNames: "Harvey Roxie",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    fullName: "Melisandre",
    fullNames: "Harvey Roxie",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    fullName: "Ferrara Clifford",
    fullNames: "Harvey Roxie",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    fullName: "Rossini Frances",
    fullNames: "Harvey Roxie",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    fullName: "Harvey Roxie",
    fullNames: "Harvey Roxie",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
