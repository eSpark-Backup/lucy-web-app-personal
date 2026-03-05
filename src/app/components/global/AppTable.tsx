"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
  Pagination,
  PaginationItem,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AppTable = ({
  columns = [],
  data = [],
  title = "",
  perPage = 10,
  maxWidth = "auto",
  minWidth = 500,
  mx = "",
  actions = false,
  handleView = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  const rowsPerPage = perPage;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data?.length / rowsPerPage);
  const handleChangePage = (_, value) => setPage(value);

  const paginatedData = data?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
          id: "actions",
          label: "Actions",
          render: (value, row, index) => (
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              key={index}
            >
              {row?.actions?.includes("view") && (
                <IconButton onClick={() => handleView(row)}>
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              )}
              {row?.actions?.includes("edit") && (
                <IconButton onClick={() => handleEdit(row)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {row?.actions?.includes("delete") && (
                <IconButton onClick={() => handleDelete(row)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          ),
        },
      ]
    : columns;

  return (
    <Box sx={{ maxWidth: maxWidth, mx: mx, p: 3 }}>
      {title && (
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: minWidth }}>
          <TableHead>
            <TableRow>
              {defaultColumns?.map((col) => (
                <TableCell key={col?.id}>
                  <Typography variant="h6" fontWeight={600} textAlign="center">
                    {col?.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.length ? (
              paginatedData?.map((row, index) => (
                <TableRow key={index} hover>
                  {defaultColumns?.map((col) => (
                    <TableCell key={col?.id}>
                      {col?.render ? (
                        col?.render(row[col?.id], row, index)
                      ) : (
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          textAlign="center"
                        >
                          {row[col?.id]}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={defaultColumns?.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {data?.length > 0 && (
        <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
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

export default AppTable;
