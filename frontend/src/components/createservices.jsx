import { Container, TextField, Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { createServices } from "../store/trainer";
import { useNavigate } from "react-router-dom";

const Createservices = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [services, setServices] = useState([
    {
      duration: "",
      description: "",
      charges: "",
    },
  ]);

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    if (services.length < 4) {
      setServices([
        ...services,
        { duration: "", description: "", charges: "" },
      ]);
    } else {
      addToast("Maximum 4 services allowed", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const token = useSelector((state) => state?.user?.token);

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(services);
    if (services.length !== 4) {
      addToast("Please add 4 services", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    dispatch(createServices({ token, services, addToast,navigate }));
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ margin: "0.5rem" }}
      >
        Create Services
      </Typography>
      <form onSubmit={handleSubmit}>
        {services.map((service, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>
              Service {index + 1}
            </Typography>
            <TextField
              label="Duration"
              value={service.duration}
              onChange={(e) =>
                handleServiceChange(index, "duration", e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={service.description}
              onChange={(e) =>
                handleServiceChange(index, "description", e.target.value)
              }
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Charges"
              value={service.charges}
              onChange={(e) =>
                handleServiceChange(index, "charges", e.target.value)
              }
              fullWidth
              margin="normal"
              type="number"
            />
            {index > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="button"
                  onClick={() => handleRemoveService(index)}
                  variant="outlined"
                  color="error"
                >
                  Remove Service
                </Button>
              </Box>
            )}
          </div>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
          }}
        >
          <Button
            type="button"
            onClick={handleAddService}
            variant="outlined"
            sx={{ color: "black" }}
          >
            Add Service
          </Button>
          <Button
            type="submit"
            sx={{ background: "black", color: "white", margin: "0.5rem" }}
          >
            Create Services
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Createservices;
