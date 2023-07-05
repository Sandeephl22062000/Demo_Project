import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(2),
  },
  chatContainer: {
    flex: 1,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    overflowY: 'auto',
  },
  messageContainer: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  messageText: {
    marginLeft: theme.spacing(1),
  },
  inputContainer: {
    display: 'flex',
  },
  textField: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  sendButton: {
    minWidth: '100px',
  },
}));

const ChatMessage = ({ text, isUserMessage }) => {
  const classes = useStyles();

  return (
    <Paper
      className={`${classes.messageContainer} ${
        isUserMessage ? classes.userMessageContainer : ''
      }`}
    >
      <Typography variant="body1" className={classes.messageText}>
        {text}
      </Typography>
    </Paper>
  );
};

const ChatInput = ({ onSend }) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.inputContainer}>
      <TextField
        label="Type your message"
        value={message}
        onChange={handleChange}
        className={classes.textField}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.sendButton}
        onClick={handleSend}
      >
        Send
      </Button>
    </div>
  );
};

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.chatContainer}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message}
            isUserMessage={index % 2 === 0} // Example: alternate message styles
          />
        ))}
      </Paper>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

const VirtaulTrainer = () => {
  return (
    <div>
      <Typography variant="h4">Virtual Trainer Chat</Typography>
      <Chat />
    </div>
  );
};

export default VirtaulTrainer;
