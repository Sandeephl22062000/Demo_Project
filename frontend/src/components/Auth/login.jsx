import { useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import validationSchema from "../schema/schema";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import GoogleIcon from "../../images/Google__G__Logo.svg.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserByID, loginUser } from "../../store/user";
import { useToasts } from "react-toast-notifications";
import { useGoogleLogin } from "@react-oauth/google";
import loginValidationSchema from "../schema/loginValidationSchema";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleForgotPassword = () => {};
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        dispatch(
          loginUser({
            email: values.email,
            password: values.password,
            addToast,
            navigate,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          googleAccessToken: tokenResponse.access_token,
        }
      );
      console.log(data);
      localStorage.setItem("id", data?.data);
      localStorage.setItem("token", data?.token);
      addToast(data?.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      throw error;
    }
  };
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const trainerLogin = () => {
    navigate("/trainerlogin");
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          gap: "16px",
          marginTop: "40px",
          marginBottom: "50px",
          padding: "20px",
        }}
      >
        <h3 style={{ textAlign: "center", marginTop: "50px" }}>LOGIN</h3>
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
            sx={{ width: "100%", margin: "10px" }}
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
            sx={{ width: "100%", margin: "10px" }}
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
          </Box>{" "}
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "5rem",
            width: "100%",
            marginBottom: "5rem",
          }}
        >
          <Typography sx={{ marginBottom: "10px" }}>OR</Typography>
          <Button
            sx={{
              width: "70%",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
            onClick={() => login()}
          >
            <img
              src={GoogleIcon}
              style={{ height: "20px", width: "20px", margin: "5px" }}
            />
            Login with Google
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default Login;
