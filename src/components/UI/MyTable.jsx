import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";

export const MyTable = ({
  columns,
  data,
  onDelete,
  checkedItems,
  setCheckedItems,
  isBannerTable = false,
}) => {
  const navigate = useNavigate();

  const handleCheck = (e, id) => {
    e.stopPropagation();
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleRowClick = (id, e) => {
    if (!e.target.closest("input[type='checkbox']") && isBannerTable) {
      navigate(`/banner/${id}`);
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">№</TableCell>
          {columns.map((col, index) => (
            <TableCell key={index} align="center">
              {col}
            </TableCell>
          ))}
          <TableCell align="center">Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            hover
            onClick={(e) => handleRowClick(row.id, e)}
            style={{ cursor: "pointer" }}
          >
            <TableCell align="center">{index + 1}</TableCell>
            {columns.map((col, i) => (
              <TableCell key={i} align="center">
                {row[col]}
              </TableCell>
            ))}
            <TableCell align="center">
              <Checkbox
                checked={checkedItems.includes(row.id)}
                onChange={(e) => handleCheck(e, row.id)}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                color="error"
                onClick={(e) => handleDeleteClick(e, row.id)}
                disabled={!checkedItems.includes(row.id)}
              >
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
