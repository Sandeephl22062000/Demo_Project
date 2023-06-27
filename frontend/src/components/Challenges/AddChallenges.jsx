import { ModalDialog } from "@mui/joy";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserKeyword } from "../../store/user";
import { useEffect } from "react";
import { createChallenges } from "../../store/challenges";

const AddChallenges = (props) => {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [challengeRules, setChallengeRules] = useState("");
  const [receiver, setReceiver] = useState({});
  const [challengeName, setChallengeName] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const token = useSelector((state) => state?.user?.token);
  const dispatch = useDispatch();
  const renderOption = (option) =>
    users?.map((user) => (
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => {
          if (
            !selectedUsers.find((selectedUser) => selectedUser._id === user._id)
          ) {
            setSelectedUsers((prevUsers) => [...prevUsers, user]);
          }
        }}
      >
        <Avatar src={user.photo} alt={user.name} />
        <span>{user.name}</span>
      </Box>
    ));

  console.log("user", receiver);
  const users = useSelector((state) => state?.user?.SearchUserResult);

  const handleOptionClick = (event, user) => {
    event.stopPropagation();
    if (!selectedUsers.find((selectedUser) => selectedUser._id === user._id)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const creatChallengeHandler = () => {
    dispatch(
      createChallenges({
        receiver: selectedUsers,
        challengeName,
        challengeDescription,
        challengeRules,
        token,
      })
    );
  };
  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchUserKeyword(search));
    }
  }, [search]);

  return (
    <div>
      <ModalDialog
        aria-labelledby="variant-modal-title"
        aria-describedby="variant-modal-description"
        variant={props.variant2}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Autocomplete
              freeSolo
              disableClearable
              sx={{ width: "60%", margin: "12px" }}
              options={users || []}
              getOptionLabel={(option) => option.name}
              onClick={(event, user) => handleOptionClick(event, user)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search your friends"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
              renderOption={renderOption}
            />
          </Box>
          <List>
            {selectedUsers.map((selectedUser) => (
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  key={selectedUser._id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "16px",
                    marginBottom: "8px",
                  }}
                >
                  <Avatar
                    src={selectedUser.photo}
                    alt={selectedUser.name}
                    sx={{ marginRight: "8px" }}
                  />
                  <span>{selectedUser.name}</span>
                </Box>
                <Button
                  onClick={() => {
                    setSelectedUsers((prevUsers) =>
                      prevUsers.filter((user) => user._id !== selectedUser._id)
                    );
                  }}
                >
                  <CloseIcon />
                </Button>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="challenge-photo-upload">
              <input
                type="file"
                id="challenge-photo-upload"
                style={{ display: "none" }}
              />
              <Button
                component="span"
                variant="outlined"
                sx={{ marginBottom: "16px" }}
              >
                Upload Photo
              </Button>
            </label>
          </Box>
          <TextField
            label="Challenge Title"
            variant="outlined"
            fullWidth
            name="challengeName"
            value={challengeName}
            onChange={(e) => {
              setChallengeName(e.target.value);
            }}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Challenge Description"
            name="challengeDescription"
            variant="outlined"
            fullWidth
            value={challengeDescription}
            onChange={(e) => {
              setChallengeDescription(e.target.value);
            }}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Challenge Rules"
            name="challengeRules"
            variant="outlined"
            fullWidth
            value={challengeRules}
            onChange={(e) => {
              setChallengeRules(e.target.value);
            }}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            sx={{
              background: "black",
              color: "white",
              height: "50px",
              "&:hover": {
                background: "black",
              },
            }}
            onClick={creatChallengeHandler}
          >
            Post
          </Button>
        </Box>
      </ModalDialog>
    </div>
  );
};

export default AddChallenges;
