import * as React from "react";
import { Avatar, Box, Button, Container } from "@mui/material";
import TrainingPendingRequest from "./trainingPendingRequest";
import TrainingAcceptedRequest from "./trainingRequestAccepted";
import TrainingRejectedRequest from "./trainingRequestRejected";

export default function BasicTable() {
  const [activeTab, setActiveTab] = React.useState("pending");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container sx={{ minHeight: "70vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "7rem",
          width: "100%",
        }}
      >
        <Button
          sx={{
            background: activeTab === "pending" ? "black" : "white",
            color: activeTab === "pending" ? "white" : "black",
            margin: "0.5rem",
            "&:hover": {
              background: "black",
              color: "white",
            },
          }}
          onClick={() => handleTabChange("pending")}
        >
          Pending Requests
        </Button>
        <Button
          sx={{
            background: activeTab === "accepted" ? "black" : "white",
            margin: "0.5rem",
            "&:hover": {
              background: "black",
              color: "white",
            },
            color: activeTab === "accepted" ? "white" : "black",
          }}
          onClick={() => handleTabChange("accepted")}
        >
          Accepted Requests
        </Button>
        <Button
          sx={{
            background: activeTab === "rejected" ? "black" : "white",
            color: activeTab === "rejected" ? "white" : "black",
            margin: "0.5rem",
            "&:hover": {
              background: "black",
              color: "white",
            },
          }}
          onClick={() => handleTabChange("rejected")}
        >
          Rejected Requests
        </Button>
      </Box>
      {activeTab === "pending" && <TrainingPendingRequest />}
      {activeTab === "accepted" && <TrainingAcceptedRequest />}
      {activeTab === "rejected" && <TrainingRejectedRequest />}
    </Container>
  );
}
