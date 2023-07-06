import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getNoatifcation } from "../../store/user";
import { useEffect } from "react";
import {
  PendingRequest,
  acceptRequest,
  rejectRequest,
} from "../../store/trainer";
import axios from "axios";
import { useState } from "react";
import { Avatar, Box, Button, Container } from "@mui/material";
import { Typography } from "@mui/joy";

const TrainingRequestRejected = () => {
  const [pendingRequest, setPendingReqeust] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);

  const acceptRequestHandler = (id, userName, userEmail) => {
    console.log(id);
    console.log(userName);
    console.log(userEmail);
    dispatch(acceptRequest({ id, token, userName, userEmail }));
  };
  const rejectRequestHandler = (id) => {
    console.log(id);
    dispatch(rejectRequest({ id, token }));
  };
  useEffect(() => {
    // dispatch(PendingRequest({ token }));
    const data = async () => {
      const postData = await axios.get(
        `http://localhost:8000/api/request/pendingRequest/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingReqeust(postData?.data?.request);
    };
    data();
  }, []);
  return (
    <Container sx={{ minhHeight: "60vh" }}>
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingRequest?.map((request) => (
              <TableRow
                key={request._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {console.log(request)}
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
                  <Button
                    sx={{ background: "green", color: "white" }}
                    onClick={acceptRequestHandler(
                      request?._id,
                      request?.user?.name,
                      request?.user?.email
                    )}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{ background: "red", color: "white" }}
                    onClick={rejectRequestHandler(request?._id)}
                  >
                    Reject
                  </Button>
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TrainingRequestRejected;
