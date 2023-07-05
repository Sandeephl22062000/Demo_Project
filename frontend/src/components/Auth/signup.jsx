import { useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../../utils/firebase";
import React, { useState } from "react";
import validationSchema from "../schema/schema";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import client from "../../features/client";
import { useToasts } from "react-toast-notifications";
import profileImage from "../../images/Profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "../../images/Google__G__Logo.svg.webp";
import { setToken } from "../../store/user";
import { useDispatch } from "react-redux";
const Signup = () => {
  const [images, setImages] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const photoupload = (event) => {
    let file = event.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages(url);
        });
      }
    );
  };

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    console.log("tokenResponse", tokenResponse);
    const { data } = await axios.post(
      "http://localhost:8000/api/users/register",
      {
        googleAccessToken: tokenResponse.access_token,
      }
    );
    console.log(data);
    const { token, id } = data;
    console.log(token, id);
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    dispatch(setToken(token));
    navigate("/");

    addToast(data?.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(2).max(25).required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Password does not match"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("users");
      const sendData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/users/register",
            {
              name: values.fullName,
              email: values.email,
              password: values.password,
              photo: images,
              role: 0,
            }
          );
          console.log(response);
          addToast(response.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          navigate("/login");
        } catch (error) {
          console.log(error);
          addToast(error.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
      };
      sendData();
    },
  });
  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>
        REGISTER AS USER
      </h3>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
          width: "40%",
          gap: "16px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ padding: "10px" }}
        >
          {!images ? (
            <Avatar
              src={profileImage}
              alt="Preview"
              sx={{
                width: "200px",
                height: "200px",
                margin: "auto",
                fontSize: "3.75rem",
              }}
            />
          ) : (
            <Avatar
              src={images}
              alt="Preview"
              sx={{
                width: "200px",
                height: "200px",
                margin: "auto",
                fontSize: "3.75rem",
              }}
            />
          )}
          <TextField
            required
            id="outlined-required"
            name="photo"
            // label="Upload Profile Photo"
            type="file"
            onChange={photoupload}
            onBlur={formik.handleBlur}
            error={formik.touched.photo && Boolean(formik.errors.photo)}
            helperText={formik.touched.photo && formik.errors.photo}
            sx={{ width: "100%", margin: "8px" }}
          />

          <TextField
            required
            id="outlined-required"
            name="fullName"
            value={formik.values.fullName}
            label="Name"
            type="string"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            sx={{ width: "100%", margin: "8px" }}
          />
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
          <TextField
            required
            id="outlined-required"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            label="confirm Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{ width: "100%", margin: "8px" }}
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "red",
                width: "155px",
                height: "63px",
                fontSize: "19px",
              }}
            >
              Submit
            </Button>
          </Box>
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
            Signup with Google
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default Signup;
