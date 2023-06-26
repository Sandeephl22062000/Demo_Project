import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

const Food = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const getData = await axios
      .get(`https://api.api-ninjas.com/v1/nutrition?query=${search}`, {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((response) => {
        const limitData = response.hits.slice(0, 3);
        setData(limitData);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clickHandler = () => {
    getData();
    console.log(search);
  };
  const submitHandler = () => {
    getData();
    console.log(search);
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <form onSubmit={submitHandler}>
          <TextField
            required
            id="outlined-required"
            value={search}
            label="Search"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ bgcolor: "white", padding: "10px", width: "500px" }}
          />

          <Button onClick={clickHandler}>Search</Button>
        </form>
      </Container>
    </div>
  );
};

export default Food;

// import * as React from "react";

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./Food.css";
// import {
//   Box,
//   Button,
//   Container,
//   Input,
//   InputBase,
//   TextField,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// // import PieChart from '../pieChart';
// export const Food = () => {
//   const [text, setText] = useState("");
//   const [data, setData] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);
//   const [rows, setRows] = useState([]);

//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   console.log(data.length);

//   // const getData = async () => {
//   //   const getData = await axios
//   //     .get(`'https://api.api-ninjas.com/v1/nutrition?query=${text}`)
//   //     .then((response) => response.json())
//   //     .then((response) => {
//   //       const limitData = response.hits.slice(0, 3);
//   //       setData(limitData);
//   //     })
//   //     .catch((err) => {
//   //       console.error(err);
//   //     });
//   // };

//   const handleSearch = async () => {
//     console.log(text);
//     const getData = await axios
//       .get(`https://api.api-ninjas.com/v1/nutrition?query=${text}`, {
//         "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
//       })
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response)
//         const limitedData = response.hits.slice(0, 3);
//         console.log(limitedData);
//         setData(limitedData);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     console.log(data);
//   };

//   console.log("Data:", data);
//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));
//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

//   const handleClick = (item) => {
//     const newRow = createData(
//       item.recipe.label,
//       Math.floor(item.recipe.calories),
//       Math.floor(item.recipe.digest[0].total),
//       Math.floor(item.recipe.digest[1].total),
//       Math.floor(item.recipe.digest[2].total)
//     );

//     setRows((prevRows) => [...prevRows, newRow]);
//   };

//   const CenteredContainer = styled(Container)({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     maxWidth: "100%",
//   });
//   

//   const addToTable = () => {
//     if (selectedData) {
//       const newRow = createData(
//         selectedData.recipe.label,
//         Math.floor(selectedData.recipe.calories),
//         Math.floor(selectedData.recipe.digest[0].total),
//         Math.floor(selectedData.recipe.digest[1].total),
//         Math.floor(selectedData.recipe.digest[2].total)
//       );

//       setRows((prevRows) => [...prevRows, newRow]);
//     }
//   };

//   return (
//     <>
//       <Container>
//         <h1 id="food_title">Track Your Daily Calories</h1>
//         <div>
//           <TableContainer component={Paper}>
//             <Table
//               sx={{ minWidth: "60%", marginBottom: "50px" }}
//               aria-label="customized table"
//             >
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//                   <StyledTableCell align="right">Calories</StyledTableCell>
//                   <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//                   <StyledTableCell align="right">
//                     Carbs&nbsp;(g)
//                   </StyledTableCell>
//                   <StyledTableCell align="right">
//                     Protein&nbsp;(g)
//                   </StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <StyledTableRow key={row.name}>
//                     <StyledTableCell component="th" scope="row">
//                       {row.name}
//                     </StyledTableCell>
//                     <StyledTableCell align="right">
//                       {row.calories}
//                     </StyledTableCell>
//                     <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                     <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                     <StyledTableCell align="right">
//                       {row.protein}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//         <CenteredContainer>
//           <form style={{ width: "100%" }} onSubmit={handleSearch}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: "10px",
//               }}
//             >
//               <InputBase
//                 sx={{ bgcolor: "white", padding: "10px", width: "500px" }}
//                 // fullWidth={true}
//                 id="search"
//                 name="search"
//                 label="search"
//                 placeholder="Name or Email"
//                 onChange={(e) => {
//                   setText(e.target.value);
//                 }}
//               />
//               <Button
//                 onClick={handleSearch}
//                 color="primary"
//                 variant="contained"
//                 type="submit"
//               >
//                 Search
//               </Button>
//             </Box>
//           </form>

//           {/*
//       <div id={data.length===0 ? "noDataDiv" : "dataDiv"}>
//       <img id="noDataImg" src="https://www.myfitnesspal.com/react-static/e95f17aa29d83b7a7588a0f825f7b66f.svg" alt="" />
//       <h5>Food Analysis</h5>
//       <p>Understand how the food you’re eating contributes to your daily calories, macronutrients, and micronutrients.</p>
//       </div> */}

//           <div
//             id={
//               data.length !== 0
//                 ? "food_search_data_div"
//                 : "no_food_search_data_div"
//             }
//           >
//             {data.map((e, i) => (
//               <div key={i} className="food_search_result_div">
//                 <div className="food_search_result_div_sec_1">
//                   <h5>{data[i].recipe.label}</h5>
//                   <div>
//                     <p>Calories : {Math.floor(data[i].recipe.calories)}</p>

//                     <div>
//                       <li>
//                         Fat : {Math.floor(data[i].recipe.digest[0].total)} mg
//                       </li>
//                       <li>
//                         Carbs : {Math.floor(data[i].recipe.digest[1].total)} mg
//                       </li>
//                       <li>
//                         Protein : {Math.floor(data[i].recipe.digest[2].total)}{" "}
//                         mg
//                       </li>
//                     </div>
//                   </div>
//                 </div>
//                 <Button onClick={() => handleClick(data[i])}>Add</Button>

//                 {/* <div className="calories_circle"> {Math.floor(data[i].recipe.calories)} </div> */}
//               </div>
//             ))}
//           </div>
//         </CenteredContainer>
//       </Container>
//     </>
//   );
// };
