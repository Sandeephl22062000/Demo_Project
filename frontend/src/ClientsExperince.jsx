import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container } from "@mui/material";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
const ClientsExperince = () => {
  return (
    <Box style={{ margin: "10px" }}>
      <Card border="secondary" style={{ width: "100%" }}>
        <Card.Header>Client Name</Card.Header>
        <Card.Body>
          <Card.Title>Experience</Card.Title>
          <Card.Title>Targeted Muscle : </Card.Title>
          <Card.Text>
            Instruction:
            <br />
          </Card.Text>
        </Card.Body>
        {/* <Button onClick={() => VideoHandler(e.name, e.muscle)}>
          View Video
        </Button> */}
      </Card>
    </Box>
  );
};

export default ClientsExperince;
