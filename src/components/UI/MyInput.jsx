import React, { useEffect, useState } from "react";
import {
  Modal as MuiModal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

export const MyInput = ({ open, handleClose, onSubmit, title, fields }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  useEffect(() => {
    if (open) {
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
    }
  }, [open, fields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = () => {
    const isValid = fields.every((field) => formData[field.name]?.trim());
    if (!isValid) {
      toast("Все поля должны быть заполнены!");
      return;
    }
    onSubmit(formData);
    handleClose();
  };

  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                variant="outlined"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                type={field.type}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Подтвердить
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};
