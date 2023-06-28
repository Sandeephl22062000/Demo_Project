import { useState, useEffect } from "react";
import React from "react";
import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useDispatch, useSelector } from "react-redux";
import {
  UserByID,
  getAcceptedNoatifcation,
  getNoatifcation,
  messageReaded,
} from "../../store/user";

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const Request = useSelector((state) => state?.user?.GetAcceptedNoatifcation);
  console.log(Request);

  // console.log("acceptedRequest", acceptedRequest);

  // const totalUnRead = notifications.filter(
  //   (item) => item.is_read === false
  // ).length;

  const [open, setOpen] = useState(null);
  const token = useSelector((state) => state?.user?.token);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(messageReaded({ token }));
    setOpen(null);
  };

  const user = ((state) => state?.user?.getUserByID);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserByID(localStorage.getItem("id")))
    dispatch(getAcceptedNoatifcation({ token }));
  }, []);
  useEffect(() => {
    setNotifications(Request);
  }, [Request]);
  console.log(notifications);
  const unReadMessage = Request?.filter((item) => item.isRead === false);
  const ReadMessage = Request?.filter((item) => item.isRead === true);

  console.log(unReadMessage?.length);
  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 60, height: 60, color: "white" }}
      >
        <Badge badgeContent={unReadMessage?.length} color="error">
          <NotificationsIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {unReadMessage?.length} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {unReadMessage?.map((notification) => (
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                UnRead
              </ListSubheader>
            }
          >
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          </List>
        ))}

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              Before that
            </ListSubheader>
          }
        >
          {ReadMessage?.slice(0, 3).map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </List>

        <Divider sx={{ borderStyle: "dashed" }} />
      </Popover>
    </>
  );
}

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);
  const createdDate = new Date(notification?.createdAt).toLocaleString();
  console.log(notification, "Notificatoin");
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={notification?.trainer?.photo}
          sx={{ bgcolor: "background.neutral" }}
        >
          {avatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <NotificationsIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
            {createdDate}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.trainer?.name}
      {notification?.isAccepted ? (
        <Typography
          component="span"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          &nbsp; has accepted your request
        </Typography>
      ) : (
        <Typography
          component="span"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          &nbsp; has rejected your request
        </Typography>
      )}
    </Typography>
  );
  return {
    avatar: notification.avatar ? <NotificationsIcon /> : null,
    title,
  };
}
