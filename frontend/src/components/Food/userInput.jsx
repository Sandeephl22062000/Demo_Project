import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateCalories, priorFoodDetails } from "../../store/food";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
// import Modal from "@mui/material/Modal";
import PriorInfoModal from "./priorData";
// import ResultPage from "./ResultPage";

const UserInput = () => {
  const { addToast } = useToasts();
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const prorData = useSelector((state) => state?.food?.priorUserDetails);
  console.log("prorData", prorData?.data);
  const isLoading = useSelector((state) => state.food.loading);
  const validationSchema = yup.object().shape({
    height: yup.number().required("Height is required"),
    weight: yup.number().required("Weight is required"),
    age: yup.number().required("Age is required"),
    gender: yup.string().required("Gender is required"),
    activity: yup.string().required("Activity is required"),
  });

  const formik = useFormik({
    initialValues: {
      height: "",
      weight: "",
      age: "",
      gender: "",
      activity: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        calculateCalories({
          weight: values.weight,
          height: values.height,
          age: values.age,
          gender: values.gender,
          activity: values.activity,
          addToast,
          token,
        })
      );
      navigate(`/food/calculateCalories`);
      console.log(values);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(priorFoodDetails(token)).then((result) => {
      setDataAvailable(result.payload);
    });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {console.log("dsfvdfgvbrg", dataAvailable?.data?.length > 0)}
      {console.log("prorData.length > 0 ", prorData.length > 0)}
      {dataAvailable?.data?.length > 0 && (
        <Box sx={{ textAlign: "center", margin: "50px" }}>
          <PriorInfoModal
            open={modalOpen}
            handleClose={closeModal}
            priorDataArray={prorData?.data}
          />
        </Box>
      )}
      <h4 style={{ textAlign: "center", marginTop: "50px" }}>
        Provide your details to calculate your Calories requirement
      </h4>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          gap: "16px",
          marginTop: "1.4rem",
          marginBottom: "40px",
          padding: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ padding: "10px" }}
        >
          <TextField
            required
            id="outlined-required"
            name="height"
            value={formik.values.height}
            label="Height in cm"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
            sx={{ width: "100%", margin: "8px" }}
          />
          <TextField
            required
            id="outlined-disabled"
            name="weight"
            value={formik.values.weight}
            label="Weight in kg"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            sx={{ width: "100%", margin: "8px" }}
          />
          <TextField
            required
            id="outlined-disabled"
            name="age"
            value={formik.values.age}
            label="Age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            sx={{ width: "100%", margin: "8px" }}
          />
          <FormControl sx={{ width: "100%", margin: "8px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              name="gender"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%", margin: "8px" }}>
            <InputLabel id="demo-simple-select-label">Activity</InputLabel>
            <Select
              name="activity"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.activity}
              label="Activity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.activity && Boolean(formik.errors.activity)}
              helperText={formik.touched.activity && formik.errors.activity}
            >
              <MenuItem value="Sedentary">
                Sedentary: little or no Exercise
              </MenuItem>
              <MenuItem value="Light">Light: exercise 1-3 times/week</MenuItem>
              <MenuItem value="Moderate">
                Moderate: exercise 4-5 times/week
              </MenuItem>
              <MenuItem value="VeryActive">
                Very Active: exercise 6-7 times/week
              </MenuItem>
              <MenuItem value="ExtraActive">
                Extra Active: very intense exercise daily, or physical job
              </MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "red",
                "&:hover": { background: "red" },
                width: "120px",
                height: "40px",
                fontSize: "15px",
                marginTop: "10px",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
        {console.log(prorData.data !== null)}
        {prorData.data !== null && (
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
            <Typography>OR</Typography>
            <h4>Click here to use your previously submitted data</h4>
            <Button
              onClick={openModal}
              sx={{
                color: "white",
                background: "black",
                "&:hover": { background: "black" },
              }}
            >
              Click Here
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};
export default UserInput;
