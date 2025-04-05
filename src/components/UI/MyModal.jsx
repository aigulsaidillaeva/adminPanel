import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";

export const MyModal = ({ open, handleClose, onConfirm, message }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal-description"
    >
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
        <Typography
          id="confirmation-modal-description"
          variant="h6"
          gutterBottom
        >
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            color="primary"
            variant="contained"
          >
            Подтвердить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
