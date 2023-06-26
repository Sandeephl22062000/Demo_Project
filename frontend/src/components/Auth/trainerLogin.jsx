import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import TransitionAlerts from "../TransitionAlerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/user";
import { TrainerById, loginTrainer } from "../../store/trainer";

const TrainerLogin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForgotPassword = () => {};
  const TrainerValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: TrainerValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(
        loginTrainer({ email: values.email, password: values.password })
      );
      const trainer = JSON.parse(localStorage.getItem("TrainerInfo"));
      const trainerID = trainer.data;
      console.log(trainer);
      dispatch(TrainerById(trainerID));
    },
  });
  return (
    <>
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "9999",
          }}
        >
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>LOGIN</h3>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
          width: "40%",
          gap: "16px",
          marginTop: "40px",
          marginBottom: "50px",
          padding: "20px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ margin: "20px", padding: "10px" }}
        >
          <TextField
            required
            id="outlined-required"
            name="email"
            value={formik.values.email}
            label="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ width: "100%", margin: "8px" }}
          />
          <TextField
            required
            id="outlined-required"
            name="password"
            value={formik.values.password}
            label="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ width: "100%", margin: "8px" }}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "red",
                width: "130px",
                height: "50px",
                fontSize: "19px",
                margin: "10px",
                justifyContent: "center",
              }}
            >
              Submit
            </Button>
            <Box
              onClick={handleForgotPassword}
              sx={{
                display: { xs: "none", md: "flex" },
                cursor: "pointer",
                marginLeft: "auto", // Adjust the margin as needed
              }}
            >
              <Typography>Forgot Password?</Typography>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};
export default TrainerLogin;
