import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { ChatList, MessageList, Input } from "react-chat-ui";

const APP_ID = "241805377c63d8d1";
const REGION = "<YOUR_REGION>";
const AUTH_KEY = "aeb76df85a1b0f1d429e509cfbca9cb1b47af0b6";

const USER_UID = localStorage.getItem("id");

CometChat.init(APP_ID);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    CometChat.login(USER_UID, AUTH_KEY).then(
      (user) => {
        console.log("CometChat Login Successful:", user);
      },
      (error) => {
        console.log("CometChat Login Error:", error);
      }
    );
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      const message = new CometChat.TextMessage(
        "supergroup",
        text,
        CometChat.RECEIVER_TYPE.GROUP
      );

      CometChat.sendMessage(message).then(
        (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            new MessageList.Message({
              id: message.id,
              senderName: message.sender.name,
              message: message.text,
            }),
          ]);
          setText("");
        },
        (error) => {
          console.log("Message sending failed with error:", error);
        }
      );
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <ChatList messages={messages} />
      <Input
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={sendMessage}
      />
    </div>
  );
};

export default Chat;
