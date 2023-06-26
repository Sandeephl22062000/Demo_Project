import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.user.token);
  const chartData = [
    { name: "Category A", value: 400, fill: "#8884d8" },
    { name: "Category B", value: 300, fill: "#82ca9d" },
  ];

  const getuserTrackedDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/trackedrecords",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserTrackedDetails();
  }, []);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <h3>View all your Tracked Calories</h3>
      </Box>
      {data.map((meals) => (
        <>
          <h2>{meals.name}</h2>
          <TableContainer component={Paper} sx={{ margin: "50px 0" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Food Items (100g serving)</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Calories (g)</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Fats (g)</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Carbs (g)</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Proteins (g)</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Quantity (100 g)</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals?.items?.map((item) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell aign="right">{item.name}</TableCell>
                      <TableCell align="right">{item.calories}</TableCell>
                      <TableCell align="right">{item.fat}</TableCell>
                      <TableCell align="right">{item.carbs}</TableCell>
                      <TableCell align="right">{item.protein}</TableCell>
                      <TableCell aign="right">{item.quantity}</TableCell>
                    </TableRow>
                  </>
                ))}
                <TableRow
                  title="Total"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Total
                  </TableCell>
                  <TableCell align="right">{meals?.sumCalorie}</TableCell>
                  <TableCell align="right">{meals?.sumFat}</TableCell>
                  <TableCell align="right">{meals?.sumCarbs}</TableCell>
                  <TableCell align="right">{meals?.sumProtein}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </Container>
  );
}
