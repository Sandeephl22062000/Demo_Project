import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import MealCard from "./MealCard";

const IntelligentDiet = () => {
  const [response, setResponse] = useState("");
  const [foodType, setFoodTypes] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const handleCaloriesChange = (event) => {
    setCalories(event.target.value);
  };

  const handleCarbsChange = (event) => {
    setCarbs(event.target.value);
  };

  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  };

  const res = async () => {
    const resp = await axios.post(
      "http://localhost:8000/api/users/intelligentdiet",
      {
        calories: calories,
        protein: carbs,
        carbs: protein,
      }
    );
    setResponse(resp?.data?.choices[0].message?.content);
  };

  const sendRequest = () => {
    console.log(foodType);
    // res();
  };

  return (
    <Container sx={{ minHeight: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        {" "}
        <Box sx={{ width: "60%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="foodType"
              value={foodType}
              label="Food type"
              onChange={(e) => {
                setFoodTypes(e.target.value);
              }}
            >
              <MenuItem value={"Vegeterian"}>Vegeterian</MenuItem>
              <MenuItem value={"Non-Vegeterian"}>Non-Vegeterian</MenuItem>
              <MenuItem value={"Vegan"}>Vegan</MenuItem>
              <MenuItem value={"Eggiterian"}>Eggiterian</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={sendRequest}>
          Submit
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <MealCard />
        <MealCard />
        <MealCard />
      </Box>
    </Container>
  );
};

export default IntelligentDiet;
