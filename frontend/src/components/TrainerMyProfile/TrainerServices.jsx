import { Box, Button, Card, Container, Typography } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getservices } from "../../store/trainer";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const TrainerServices = () => {
  const [variant, setVariant] = React.useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  console.log(token);
  const services = useSelector((state) => state?.trainer?.trainerServicesList);

  const setEditHandle = (id) => {
    dispatch(editServices(id));
  };
  useEffect(() => {
    const trainerID = localStorage.getItem("id");
    dispatch(getservices({ trainerID, token }));
  }, []);
  return (
    <Container sx={{ width: "100%", margin: "2rem 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <h3>
          <b>Your Services</b>
        </h3>
      </Box>
      <Box>
        {services?.map((service) => (
          <Box>
            <Card
              sx={{
                minHeight: "100px",
                border: "black 2px solid",
                marginTop: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#D1CBCB",
                }}
              >
                <Typography sx={{ marginLeft: "1rem" }}>
                  {service?.duration} Month
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <DeleteIcon />
                  <Button
                    sx={{ color: "black" }}
                    onClick={setEditHandle(service._id)}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{
                        width: "1.6rem",
                        height: "1.6rem",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Button>
                </Box>
              </Box>
              <Box>
                <b style={{ margin: "10px" }}>Includes</b>
                <p style={{ margin: "10px" }}>{service?.description}</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#D1CBCB",
                }}
              >
                <Typography>Charges: {service?.charges}</Typography>
              </Box>
            </Card>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              navigate("/services");
            }}
            sx={{
              background: "black",
              color: "white",
              width: "10rem",
              height: "2rem",
            }}
          >
            Create Services
          </Button>
        </Box>
      </Box>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <Typography id="variant-modal-title" component="h2" level="inherit">
            Modal Dialog
          </Typography>
          <Typography id="variant-modal-description" textColor="inherit">
            This is a `{variant}` modal dialog.
          </Typography>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default TrainerServices;
