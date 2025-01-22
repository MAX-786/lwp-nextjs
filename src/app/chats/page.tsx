"use client";
import { useState, useEffect } from "react";
import {io, Socket} from "socket.io-client";

let socket: Socket;

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket = io(); 
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    return () => {
      socket.disconnect(); 
    };
  }, []);
  

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("user-message", message);
      setMessage(""); 
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chatting</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter Message"
        style={{
          padding: "10px",
          marginRight: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>

      <div
        id="messages"
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: "5px 0" }}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
