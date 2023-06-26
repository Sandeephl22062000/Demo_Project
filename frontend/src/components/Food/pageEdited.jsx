import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { priorFoodCalory } from "../../store/food";

const CalorieDetail = () => {
  const [showTrackPage, setShowTrackPage] = useState(false);
  const [Goal, setGoal] = useState("");
  const [Target, setTarget] = useState("");
  const [RequireCalories, setRequireCalories] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const priorMaintainceData = useSelector(
    (state) => state.food.priorFoodCaloryvalue
  );
  let maintainceCalory;
  const Calories = useSelector((state) => state.food.calculateFoodCalories);
  if (priorMaintainceData === 0) {
    maintainceCalory = Calories;
  } else {
    maintainceCalory = priorMaintainceData;
  }
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(priorFoodCalory(token));
  }, []);
  console.log(maintainceCalory);
  const showData = (data) => (
    <>
      {" "}
      <h3>{`How much Weight do you want to ${data}?`}</h3>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <FormControl sx={{ m: 2, width: "40%", minWidth: "200px" }}>
          {Goal && (
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={Target}
              placeholder="target"
              onChange={(e) => {
                setTarget(e.target.value);
              }}
              autoWidth
              label="target"
            >
              <MenuItem value="0.25">0.25</MenuItem>
              <MenuItem value="0.50">0.50</MenuItem>
              <MenuItem value="0.75">0.75</MenuItem>
              <MenuItem value="1.0">1.0</MenuItem>
            </Select>
          )}
        </FormControl>
      </Box>
    </>
  );

  const showdetail = () => {
    if (Goal === "Gain") {
      const calculatedCalories = (Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.65) / 4;
      const calculatedProtein = (maintainceCalory * 0.2) / 4;
      setRequireCalories(calculatedCalories);
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    } else if (Goal === "Loss") {
      const calculatedCalories =
        (maintainceCalory - Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.45) / 4;
      const calculatedProtein = (maintainceCalory * 0.15) / 4;

      setRequireCalories(calculatedCalories);
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    } else {
      setRequireCalories(maintainceCalory);

      const calculatedCarbs = (maintainceCalory * 0.55) / 4;
      const calculatedProtein = (maintainceCalory * 0.17) / 4;
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    }
    return;
  };
  useEffect(() => {
    showdetail();
  }, [showdetail]);

  const clickHandler = () => {
    setShowTrackPage(true);
    navigate(`/calculatediet/${protein}/${carbs}/${RequireCalories}`);
  };
  return (
    <>
      (
      <>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          {maintainceCalory && (
            <h2 style={{ margin: "50px" }}>
              According to the Details provided your Maintaince Calory is{" "}
              {maintainceCalory}
            </h2>
          )}
          <FormControl sx={{ m: 1, width: "40%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Goal
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={Goal}
              onChange={(e) => {
                setGoal(e.target.value);
              }}
              autoWidth
              label="Goal"
            >
              <MenuItem value="Gain">Gain Weight</MenuItem>
              <MenuItem value="Loss">Loss Weight</MenuItem>
              <MenuItem value="Maintain">Maintain Weight</MenuItem>
            </Select>
          </FormControl>
          {Goal === "Gain" ? (
            showData("Gain")
          ) : Goal === "Loss" ? (
            showData("Loss")
          ) : (
            <Typography>Track Your Calories</Typography>
          )}
          {Target && (
            <TableContainer
              component={Paper}
              sx={{
                width: "40%", // Adjust the width as needed
                marginTop: "1rem", // Add margin for spacing
              }}
            >
              <Table
                sx={{ tableLayout: "fixed" }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Calories Requirement:
                    </TableCell>
                    <TableCell align="right">{RequireCalories}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Protein Requirement:
                    </TableCell>
                    <TableCell align="right">{protein}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Carbohydrates Requirement:
                    </TableCell>
                    <TableCell align="right">{carbs}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box></Box>
          <Button
            onClick={clickHandler}
            sx={{
              background: "black",
              color: "white",
              marginTop: "10px",
              height: "60px",
              width: "180px",
            }}
          >
            Track Calories
          </Button>
        </Container>
      </>
      )
    </>
  );
};
export default CalorieDetail;
