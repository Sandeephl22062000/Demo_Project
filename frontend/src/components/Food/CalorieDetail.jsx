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
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Food } from "./Food/Food";
import { useDispatch, useSelector } from "react-redux";
import { priorFoodCalory } from "../../store/food";

const CalorieDetail = () => {
  const [Goal, setGoal] = useState("");
  const [Target, setTarget] = useState("");
  const [showTrackPage, setShowTrackPage] = useState(false);
  const token = useSelector((state) => state.user.token);
  const maintainceCalory = useSelector(
    (state) => state.food.priorFoodCaloryvalue
  );
  console.log(maintainceCalory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    setShowTrackPage(true);
  };
  useEffect(() => {
    dispatch(priorFoodCalory(token));
  }, []);
  return (
    <>
      {!showTrackPage ? (
        <>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h2 style={{ margin: "50px" }}>
              According to the Details provided your Maintaince Calory is{" "}
              {maintainceCalory}
            </h2>
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
              <>
                <h3>How much Weight do you want to gain</h3>
                <FormControl sx={{ m: 1, width: "40%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Target /week
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={Target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                    autoWidth
                    label="kg per week"
                  >
                    <MenuItem value="0.25">0.25</MenuItem>
                    <MenuItem value="0.50">0.50</MenuItem>
                    <MenuItem value="0.75">0.75</MenuItem>
                    <MenuItem value="1.0">1.0</MenuItem>
                  </Select>
                </FormControl>
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
                          <TableCell align="right">
                            {(Target * 7700) / 7 + maintainceCalory}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Protein Requirement:
                          </TableCell>
                          <TableCell align="right">
                            {(maintainceCalory * 0.2) / 4}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Carbohydrates Requirement:
                          </TableCell>
                          <TableCell align="right">
                            {(maintainceCalory * 0.65) / 4}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            ) : Goal === "Loss" ? (
              <>
                <h3>How much Weight do you want to loss</h3>
                <FormControl sx={{ m: 1, width: "40%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={Target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                    autoWidth
                    label="kg per week"
                  >
                    <MenuItem value="0.25">0.25</MenuItem>
                    <MenuItem value="0.50">0.50</MenuItem>
                    <MenuItem value="0.75">0.75</MenuItem>
                    <MenuItem value="1.0">1.0</MenuItem>
                  </Select>
                </FormControl>
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
                          <TableCell align="right">
                            {(maintainceCalory - Target * 7700) / 7 +
                              maintainceCalory}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Protein Requirement:
                          </TableCell>
                          <TableCell align="right">
                            {(maintainceCalory * 0.15) / 4}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Carbohydrates Requirement:
                          </TableCell>
                          <TableCell align="right">
                            {(maintainceCalory * 0.45) / 4}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            ) : (
              <>
                <div>
                  Protein requirement for Gain weight :
                  {(maintainceCalory * 0.175) / 4}
                </div>
                <div>
                  Daily carbs requirement:{(maintainceCalory * 0.55) / 4}
                </div>
              </>
            )}
            Track Your Calories,Protein and Carbs WithOur Calory Tracker
            <Button onClick={clickHandler}>Track Calory</Button>
          </Container>
        </>
      ) : (
        <Food />
      )}
    </>
  );
};

export default CalorieDetail;
