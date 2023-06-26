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
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import client from "../../features/client";
import { useToasts } from "react-toast-notifications";
import profileImage from "../../images/Profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [images, setImages] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
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
    const accessToken = tokenResponse.access_token;

    const { data } = await axios.post(
      "http://localhost:8000/api/users/register",
      {
        googleAccessToken: tokenResponse.access_token,
      }
    );
    console.log(data.data.message);
    addToast(data.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const TrainerHandler = () => {
    navigate("/trainersignup");
  };
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
          console.log(response.data);
          addToast(response.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          navigate("/login");
          // resetForm();
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
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>REGISTER</h3>
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
        {/* <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Button onClick={TrainerHandler}>Trainer</Button>
        </div> */}
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ padding: "10px" }}
        >
          {!images ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img src={profileImage} alt="Preview" style={{ width: "100%" }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img src={images} alt="Preview" style={{ width: "100%" }} />
            </Box>
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
        <Button onClick={() => login()}>Register with google</Button>
      </Container>
    </>
  );
};
export default Signup;
