import React from "react";
import AddChallenges from "./AddChallenges";
import { Box, Button, Modal, Container } from "@mui/material";
import { useState } from "react";
import ChallengesModel from "./AddChallenges";
import Showchallenges from "./Showchallenges";

const Challenges = () => {
  const [variant, setVariant] = useState(undefined);
  const handleCloseModal = () => {
    setVariant(undefined);
  };
 

  return (
    <>
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="soft"
            color="neutral"
            onClick={() => {
              setVariant("soft");
            }}
            sx={{
              background: "black",
              color: "white",
              height: "50px",
              margin: "20px 30px",
              "&:hover": {
                background: "black",
              },
            }}
          >
            Add Challenges
          </Button>
          <Modal open={variant === "soft"} onClose={handleCloseModal}>
            <ChallengesModel variant={variant} />
          </Modal>
        </Box>
      </Container>
      <Showchallenges />
    </>
  );
};

export default Challenges;
