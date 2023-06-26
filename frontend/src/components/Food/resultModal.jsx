import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";

const SaveModal = ({ variant, name, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <Modal open={!!variant} onClose={() => setVariant(undefined)}>
      <ModalDialog
        aria-labelledby="variant-modal-title"
        aria-describedby="variant-modal-description"
        variant={variant}
      >
        <ModalClose />
        <Typography id="variant-modal-title" component="h2" level="inherit">
          Provide Name to your Calories
        </Typography>
        <input onChange={handleInputChange} value={inputValue} />
        <Box sx={{ margin: "10px", display: "flex", justifyContent: "flex" }}>
          <Button
            onClick={handleSave}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              color: "white",
              height: "50px",
              width: "100px",
            }}
          >
            Save
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default SaveModal;
