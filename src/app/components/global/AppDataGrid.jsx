"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AppDataGrid = ({
  handleView = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  maxWidth = "100%",
  actions = false,
  columns = [],
  title = "",
  rows = [],
  mx = "",
  rowsPerPage = 10,
}) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const SmallArrowBack = (props) => (
    <ArrowBackIcon fontSize="small" {...props} />
  );
  const SmallArrowForward = (props) => (
    <ArrowForwardIcon fontSize="small" {...props} />
  );

  const defaultColumns = actions
    ? [
        ...columns,
        {
          field: "actions",
          headerName: "Actions",
          width: 160,
          sortable: false,
          renderCell: (params) => {
            const row = params?.row;
            return (
              <Stack
                direction="row"
                height="100%"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {row?.actions?.includes("view") && (
                  <IconButton onClick={() => handleView(row)} size="small">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                )}
                {row?.actions?.includes("edit") && (
                  <IconButton onClick={() => handleEdit(row)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
                {row?.actions?.includes("delete") && (
                  <IconButton
                    onClick={() => handleDelete(row)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            );
          },
        },
      ]
    : columns;

  return (
    <Box sx={{ maxWidth: maxWidth, mx: mx, p: 3 }}>
      {title && (
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      <DataGrid
        rows={paginatedRows}
        columns={defaultColumns}
        checkboxSelection
        disableColumnMenu
        editMode={false}
        hideFooter
        autoHeight
      />
      {rows?.length > rowsPerPage && (
        <Stack alignItems="center" mt={2}>
          <Pagination
            count={Math?.ceil(rows?.length / rowsPerPage)}
            onChange={handlePageChange}
            page={page}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "11px",
                minWidth: "25px",
                height: "25px",
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: SmallArrowBack,
                  next: SmallArrowForward,
                }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Box>
  );
};

export default AppDataGrid;
