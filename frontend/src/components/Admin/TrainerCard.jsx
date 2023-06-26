import * as React from "react";
import Box from "@mui/material/Box";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";

import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { approveRequest, trainerToBeApproved } from "../../store/user";
import { useEffect } from "react";

const TrainerCard = () => {
  const dispatch = useDispatch();
  const approveHandler = (id) => {
    dispatch(approveRequest(id));
  };

  const trainers = useSelector((state) => state?.user?.TrainersYetToApproved);
  console.log(trainers);

  useEffect(() => {
    dispatch(trainerToBeApproved());
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h1>Trainers</h1>
      {console.log(trainers?.length)}
      {trainers?.length > 0 &&
        trainers.map((trainer) => (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Card border="secondary">
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "row",
                }}
              >
                <Card.Img
                  variant="top"
                  src={trainer.photo}
                  style={{ height: "250px", width: "250px" }}
                />
                <Card.Body>
                  <Card.Title>Name : {trainer.name}</Card.Title>

                  <Card.Title>Email : {trainer.email}</Card.Title>
                  <Card.Title>Experiences : {trainer.experiences}</Card.Title>

                  <Card.Title>
                    Specialization:{trainer.specialization}
                  </Card.Title>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Box sx={{ margin: "190px 30px 10px 0" }}>
                    <Button
                      sx={{
                        background: "red",
                        color: "white",
                        margin: "5px",
                        height: "50px",
                        width: "120px",
                      }}
                      //   onClick={(id) => {
                      //     rejectHandler(id);
                      //   }}
                    >
                      Reject
                    </Button>
                    <Button
                      sx={{
                        background: "green",
                        color: "white",
                        height: "50px",
                        width: "120px",
                      }}
                      onClick={(id) => {
                        approveHandler(trainer._id);
                      }}
                    >
                      Accept
                    </Button>
                  </Box>
                </div>
              </Box>
            </Card>
          </Box>
        ))}
    </Container>
  );
};

export default TrainerCard;
