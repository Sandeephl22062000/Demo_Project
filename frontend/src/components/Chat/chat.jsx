import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/system";

const ChatInterface = () => {
  const [searchText, setSearchText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const chatAreaRef = useRef(null);

  const handleSearch = () => {
    // Simulated search functionality
    // Replace this with your actual search logic
    // In this example, we filter the mock users based on the search text
    const filteredResults = mockUsers.filter((user) =>
      user.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  // Mock user data for search results
  const mockUsers = ["Alice", "Bob", "Charlie", "David"];

  useEffect(() => {
    // Scroll to the bottom of the chat area when new messages are added
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, []);

  return (
    <Container sx={{ height: "100vh" }}>
      <Grid container spacing={2} sx={{ height: "95vh" }}>
        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              startIcon={<SearchIcon />}
              variant="outlined"
              fullWidth
              onClick={handleDrawerOpen}
            >
              Search Users
            </Button>
            <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
              Create New Group
            </Button>
          </div>

          <Card variant="outlined" sx={{ height: "calc(100% - 108px)" }}>
            <CardContent>
              <Typography variant="h6" component="div" mb={2}>
                Existing Chats
              </Typography>
              <Divider />

              <List sx={{ maxHeight: "100%", overflow: "auto" }}>
                {/* Render existing chats here */}
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="User 1" />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="User 2" />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="User 3" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card variant="outlined" sx={{ height: "93%", marginTop: "23px" }}>
            <CardContent sx={{ height: "100%" }}>
              {/* Render chat area here */}
              <Typography variant="h6" component="div" mb={2}>
                Chat Area
              </Typography>
              <Divider />

              {/* Placeholder for chat messages */}
              <Paper
                variant="outlined"
                sx={{ height: "calc(100% - 48px)", mt: 2, overflow: "auto" }}
                ref={chatAreaRef}
              >
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>A</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Alice" secondary="Hello!" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>B</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Bob" secondary="Hi there!" />
                  </ListItem>
                  {/* Add more chat messages here */}
                </List>
              </Paper>

              <TextField
                label="Type a message"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
          <div style={{ padding: "20px" }}>
            <TextField
              label="Search users"
              fullWidth
              margin="normal"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon onClick={handleSearch} />,
              }}
            />

            <List>
              {searchResults.map((user) => (
                <ListItem key={user}>
                  <ListItemAvatar>
                    <Avatar>{user.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </Grid>
    </Container>
  );
};

export default ChatInterface;
