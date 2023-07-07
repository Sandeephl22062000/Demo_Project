import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getRejectedNoatifcation } from "../../store/user";

const TrainingRequestAccepted = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const rejectedRequest = useSelector(
    (state) => state?.user?.GetRejectedNoatifcation
  );
  console.log(rejectedRequest);

  useEffect(() => {
    dispatch(getRejectedNoatifcation({ token }));
  }, []);
  return (
    <Container>
      {rejectedRequest?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Requests Date</TableCell>
                <TableCell>Users Name</TableCell>
                <TableCell align="right">
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    Message
                  </Box>
                </TableCell>
                <TableCell align="right">Accetped at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rejectedRequest?.map((request) => (
                <TableRow
                  key={request._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",

                        flexDirection: "row",
                      }}
                    >
                      <Typography sx={{ margin: "10px" }}>
                        {new Date(request?.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",

                        flexDirection: "row",
                      }}
                    >
                      <Avatar src={request?.user?.photo}></Avatar>
                      <Typography sx={{ margin: "10px" }}>
                        {request?.user?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      {request?.message}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ margin: "10px" }}>
                      {new Date(request?.updatedAt).toLocaleString()}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8rem",
          }}
        >
          No Rejected Requests
        </Box>
      )}
    </Container>
  );
};

export default TrainingRequestAccepted;
