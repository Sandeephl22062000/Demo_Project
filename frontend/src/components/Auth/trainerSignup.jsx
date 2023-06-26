import { useFormik, Form, Field, ErrorMessage } from "formik";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../../utils/firebase";
import React, { useState } from "react";
import trainerValidationSchema from "../schema/trainerSchema";
import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profileImage from "../../images/Profile.png";
import Signup from "./signup";
const TrainerSignup = () => {
  const [images, setImages] = useState("");

  const navigate = useNavigate();
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

  const Userhandler = () => {
    navigate("/signup");
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      experience: "",
    },
    validationSchema: trainerValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log(images);
      const sendData = async () => {
        await axios.post("http://localhost:8000/api/users/register", {
          name: values.fullName,
          email: values.email,
          password: values.password,
          photo: images,
          role: 1,
          specialization: values.specialization,
          experiences: values.experience,
        });
        // resetForm();
      };
      sendData();
    },
  });
  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>Register</h3>
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
          {!images ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "400px",
                // height: "400px",
                // borderRadius: "50%",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img src={profileImage} alt="Preview" style={{ width: "50%" }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "400px",
                // height: "400px",
                // borderRadius: "50%",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img src={images} alt="Preview" style={{ width: "50%" }} />
            </Box>
          )}
          <TextField
            required
            id="outlined-required"
            name="photo"
            abel="Upload Profile Photo"
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

          <TextField
            required
            id="outlined-required"
            name="specialization"
            value={formik.values.specialization}
            label="Specialization"
            type="string"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specialization &&
              Boolean(formik.errors.specialization)
            }
            helperText={
              formik.touched.specialization && formik.errors.specialization
            }
            sx={{ width: "100%", margin: "8px" }}
          />

          <TextField
            required
            id="outlined-required"
            name="experience"
            value={formik.values.experience}
            label="experience level"
            multiline // Set multiline to true
            rows={4}
            type="string"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            helperText={formik.touched.experience && formik.errors.experience}
            sx={{ width: "100%", margin: "8px" }}
          />

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
        </form>
      </Container>
    </>
  );
};
export default TrainerSignup;
