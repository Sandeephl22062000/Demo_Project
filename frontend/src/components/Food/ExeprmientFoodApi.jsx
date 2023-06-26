import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useEffect } from "react";

const ExeprmientFoodApi = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [rows, setRows] = useState([]);
  const [sumCalorie, setSumCalorie] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);
  const [variant, setVariant] = useState(undefined);
  const [chartProteinData, setChartProteinData] = useState([]);
  const [chartCarbsData, setChartCarbsData] = useState([]);
  const [chartCaloriesData, setChartCaloriesData] = useState([]);

  const [name, setName] = useState("");
  const params = useParams();
  const TargetCarbs = params.carbs;
  const TargetProtein = params.protein;
  const TargetCalories = params.calories;
  const navigate = useNavigate();
  const clickHandler = async () => {
    const data = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${search}`,
      {
        headers: {
          "X-Api-Key": "PDs20MlEeQdZ6Ov8+dDUrg==eWlZU3bVZSFxWEHw",
        },
      }
    );
    console.log(data.data);
    setResult(data.data);
  };
  const removeItem = (index) => {
    const updatedRows = [...rows];
    const removedItem = updatedRows.splice(index, 1)[0];

    setRows(updatedRows);

    // Update the sums by subtracting the removed item's values
    setSumCalorie(sumCalorie - removedItem.calories * removedItem.quantity);
    setSumFat(sumFat - removedItem.fat * removedItem.quantity);
    setSumCarbs(sumCarbs - removedItem.carbs * removedItem.quantity);
    setSumProtein(sumProtein - removedItem.protein * removedItem.quantity);
  };

  const adjustQuantity = (index, quantity) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = quantity;
    setRows(updatedRows);
    calculateTotals(updatedRows);
  };

  const calculateTotals = (updatedRows) => {
    let newSumCalorie = 0;
    let newSumFat = 0;
    let newSumCarbs = 0;
    let newSumProtein = 0;

    updatedRows.forEach((row) => {
      const calculatedCalorie = row.calories * row.quantity;
      const calculatedFat = row.fat * row.quantity;
      const calculatedCarbs = row.carbs * row.quantity;
      const calculatedProtein = row.protein * row.quantity;

      newSumCalorie += calculatedCalorie;
      newSumFat += calculatedFat;
      newSumCarbs += calculatedCarbs;
      newSumProtein += calculatedProtein;
    });

    setSumCalorie(newSumCalorie);
    setSumFat(newSumFat);
    setSumCarbs(newSumCarbs);
    setSumProtein(newSumProtein);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const AddToTable = (index) => {
    const selectedRow = result[index];
    const newRow = createData(
      selectedRow.name,
      selectedRow.calories,
      selectedRow.fat_total_g,
      selectedRow.carbohydrates_total_g,
      selectedRow.protein_g,
      1
    );
    setRows([...rows, newRow]);
    calculateTotals([...rows, newRow]);
  };
  const token = useSelector((state) => state.user.token);
  const saveTrackedTable = async () => {
    try {
      console.log(name);
      const response = await axios.post(
        "http://localhost:8000/api/users/saveTrackedCalories",
        {
          name,
          items: rows,
          sumCalorie,
          sumFat,
          sumCarbs,
          sumProtein,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const differenceCalories = TargetCalories - sumCalorie;
  const differenceCarbs = TargetCarbs - sumCarbs;
  const differenceProtein = TargetProtein - sumProtein;
  useEffect(() => {
    const chartCaloriesData = [
      {
        name: "Calories left",
        value: differenceCalories,
        fill: "#EA706D",
      },
      { name: "Calories taken", value: sumCalorie, fill: "#82ca9d" },
    ];
    setChartCaloriesData(chartCaloriesData);
  }, [differenceCalories, sumCalorie]);
  useEffect(() => {
    const updateProteinChart = [
      { name: "Protein left", value: differenceProtein, fill: "#8884d8" },
      { name: "Protein taken", value: sumProtein, fill: "#82ca9d" },
    ];
    setChartProteinData(updateProteinChart);
  }, [differenceProtein, sumProtein]);

  useEffect(() => {
    const chartCarbsData = [
      { name: "Carbs left", value: differenceCarbs, fill: "#BB7341" },
      { name: "Carbs taken", value: sumCarbs, fill: "#82ca9d" },
    ];
    setChartCarbsData(chartCarbsData);
  }, [differenceCarbs, sumCarbs]);

  const createData = (name, calories, fat, carbs, protein, quantity) => {
    return { name, calories, fat, carbs, protein, quantity };
  };

  return (
    <>
      <Container>
        <h1
          style={{
            display: "flex",
            alignitems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Track Your Daily Calories
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "100px",
          }}
        >
          <Input
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ margin: "0 10px", width: "40%", height: "60px" }}
          />
          <Button
            onClick={clickHandler}
            style={{ backgroundColor: "red", color: "white", width: "17%" }}
          >
            Search
          </Button>
        </div>
        {result.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TableBody>
              {result.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Calories : </b>
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Fat : </b>
                    {row.fat_total_g}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Carbs : </b>
                    {row.carbohydrates_total_g}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Protein : </b>
                    {row.protein_g}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => AddToTable(index)}>Add</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Box>
        )}
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "60%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Food Items (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => adjustQuantity(index, e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => removeItem(index)}>Remove</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <TableRow>
                  <StyledTableCell>
                    <b>Total</b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {sumCalorie.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {sumFat.toFixed(2)}&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {sumCarbs.toFixed(2)}&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {sumProtein.toFixed(2)}&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <h3 style={{ marginTop: "2rem" }}>Result:</h3>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box>
              <Paper>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Difference in Protein <b>{differenceProtein.toFixed(2)}g</b>
                </Typography>
                <Typography></Typography>
                <PieChart width={400} height={300}>
                  <Pie
                    dataKey="value"
                    data={chartProteinData}
                    cx={200}
                    cy={100}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Difference in Calories <b>{differenceCalories.toFixed(2)}</b>
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="value"
                  data={chartCaloriesData}
                  cx={200}
                  cy={100}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography
                variant="h6"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Difference in Carbs <b>{differenceCarbs.toFixed(2)}g</b>
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="value"
                  data={chartCarbsData}
                  cx={200}
                  cy={100}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              color: "white",
              height: "50px",
              width: "200px",
              margin: "20px",
            }}
            onClick={() => navigate(`/viewallrecords`)}
          >
            View All Records
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setVariant("solid");
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "black",
                color: "white",
                height: "50px",
                width: "150px",
                marginRight: "10px",
                margin: "20px 5px",
              }}
            >
              View Result
            </Button>
            <Button
              onClick={saveTrackedTable}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "black",
                color: "white",
                height: "50px",
                width: "150px",
                margin: "20px 5px",
              }}
            >
              Save
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
          </ModalDialog>
        </Modal>
      </Container>
    </>
  );
};

export default ExeprmientFoodApi;
