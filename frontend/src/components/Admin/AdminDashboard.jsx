import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Card from "react-bootstrap/Card";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useState } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { approveRequest, trainerToBeApproved } from "../../store/user";
import { useEffect } from "react";
import TrainerCard from "./TrainerCard";

export default function ButtonAppBar() {
  const [showTrainer, setShowTrainer] = useState(true);
  const dispatch = useDispatch();
  // const approveHandler = (id) => {
  //   dispatch(approveRequest(id));
  // };
  // const trainers = useSelector((state) => state.user.TrainersYetToApproved);
  // console.log(trainers);

  useEffect(() => {
    dispatch(trainerToBeApproved());
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={2.3} sx={{ height: "100vh", background: "#E2E2E0" }}>
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setShowTrainer(true)}>
                    <ListItemText primary="Trainer" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="User" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={9.7} style={{ height: "100%" }}>
            {showTrainer && <TrainerCard />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
